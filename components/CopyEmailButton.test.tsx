import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CopyEmailButton } from "./CopyEmailButton";

const EMAIL = "faculambertucci98@gmail.com";
const LABELS = {
  copyLabel: "Copy email",
  copiedLabel: "Email copied",
  copyFailedLabel: "Couldn't copy. Use the link instead",
};

function renderButton() {
  return render(<CopyEmailButton email={EMAIL} {...LABELS} />);
}

/** Espera a que se resuelva la promesa de writeText y React actualice. */
async function flush() {
  await act(async () => {
    await Promise.resolve();
  });
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("CopyEmailButton", () => {
  it("always shows the email as a mailto link", () => {
    renderButton();
    expect(screen.getByRole("link", { name: EMAIL })).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  it("copies the email and announces it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    renderButton();

    fireEvent.click(screen.getByRole("button", { name: LABELS.copyLabel }));
    await flush();

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(screen.getByRole("status")).toHaveTextContent(LABELS.copiedLabel);

    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.getByRole("button", { name: LABELS.copyLabel })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("when the clipboard is missing, shows the failure label and keeps a mailto link", async () => {
    vi.stubGlobal("navigator", {});
    renderButton();

    expect(() => fireEvent.click(screen.getByRole("button", { name: LABELS.copyLabel }))).not.toThrow();
    await flush();

    expect(screen.getByRole("status")).toHaveTextContent(LABELS.copyFailedLabel);
    expect(screen.getByRole("link", { name: EMAIL })).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  /*
    "Couldn't copy. Use the link instead" es más largo que "Email copied" y es
    el único aviso de que algo salió mal: 1,5 s no alcanzaba para leerlo.
  */
  it("keeps the failure label long enough to read it", async () => {
    vi.stubGlobal("navigator", {});
    renderButton();
    fireEvent.click(screen.getByRole("button", { name: LABELS.copyLabel }));
    await flush();

    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(screen.getByRole("status")).toHaveTextContent(LABELS.copyFailedLabel);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("status")).toHaveTextContent("");
  });

  it("when the clipboard rejects (permission denied), shows the failure label", async () => {
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
    renderButton();

    fireEvent.click(screen.getByRole("button", { name: LABELS.copyLabel }));
    await flush();

    expect(screen.getByRole("status")).toHaveTextContent(LABELS.copyFailedLabel);
  });
});
