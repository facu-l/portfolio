# Portfolio Rebrand ("Casebook") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the portfolio into a bilingual (EN/ES) "Casebook" that gets Facundo interviews as a Junior Full Stack Developer, with each project told as verifiable technical decisions.

**Architecture:** All routes move under `app/[lang]/` (root layout there, `generateStaticParams` for `en`/`es`, `dynamicParams = false`). All copy lives in one typed `SiteContent` object per locale (`content/en.ts`, `content/es.ts`), passed down as props from the page so components stay pure and testable. `proxy.ts` only handles `/` (Accept-Language redirect); the old case-study URL is a `next.config.ts` permanent redirect.

**Tech Stack:** Next.js 16.3 (App Router, `proxy.ts`), React 19, TypeScript, Tailwind v4 (`@theme` tokens), `next/font/google`, Vitest + Testing Library, gstack `/browse` + `/qa` for visual QA.

**Spec:** `docs/superpowers/specs/2026-11-14-portfolio-rebrand-design.md` (read it before Task 1; this plan argues from it).

## Global Constraints

- Before writing routing, metadata, proxy or font code, read the matching guide in `node_modules/next/dist/docs/` (`01-app/02-guides/internationalization.md`, `file-conventions/proxy`, `functions/generate-static-params`, `functions/generate-metadata`). Next 16 differs from training data.
- Colors (exact): background `#0c0d0f`, surface `#141518`, border `#24262b`, foreground `#eef0f2`, muted `#8b9099`, accent `#c8f03c`. Accent only on verifiable/clickable things, the final period signature, the status indicator and focus rings. Never accent background with light text.
- Fonts: Schibsted Grotesk (400/600/800) for display and body, JetBrains Mono (400/500) for technical data. Loaded with `next/font/google`. Inter is removed.
- Radii: surfaces 4px, buttons full pill. No other radius.
- No glow, no decorative gradients, max 1 eyebrow per 3 sections, zero em-dash (`—`) and en-dash (`–`) in any visible string, both locales.
- Hero copy is fixed by the spec (§3). The AI-workflow sentence (EN) is fixed: "Built with an AI-assisted workflow: I made and documented the architecture decisions (more than 120 in the decision log), reviewed every change, and kept the business rules under test so that generated code couldn't silently break them."
- Motion: CSS only, `transform`/`opacity` only, <= 400ms, ease-out, everything off under `prefers-reduced-motion`. `animejs` is removed. No Motion/GSAP added.
- Never claim what isn't backed: CEF backend (Rust) was a teammate's; articulos-api is labeled "course project".
- Commits: atomic, English, `type(scope): description`, ending with the `Co-Authored-By` line from the session. Commit only when Facundo has approved committing for this work.
- Every task ends with `npm test` and `npm run lint` green and `npm run build` succeeding.

## Review Focus

1. **Accept-Language edge cases** (`es-AR`, `pt-BR, es;q=0.5`, `*`, missing header, malformed): `/` must redirect to a valid locale exactly once, never loop. Tests in Task 3.
2. **Old shared links** (`/work/gym-management-system` from the current CV and LinkedIn): must 308 to `/en/work/gym-management-system`, not 404. Test in Task 3.
3. **Clipboard unavailable** (permission denied, non-secure context, old browser): copy button must not throw; it shows a failure label and the email stays visible and selectable with a `mailto:` link. Test in Task 4.
4. **Unsupported locale segment** (`/fr`, `/EN`): 404, not a crash or an English page under a wrong `lang`. Test in Task 3.
5. **Locale drift**: a string added in one locale only, or an em-dash slipped into Spanish copy. Parity and typography tests in Task 2.

---

## File structure (after the rebrand)

```
app/
  globals.css                  tokens (modified)
  robots.ts                    unchanged
  sitemap.ts                   both locales (modified)
  [lang]/
    layout.tsx                 root layout: <html lang>, fonts, metadata, reveal script
    page.tsx                   home
    opengraph-image.tsx        per-locale OG (moved from app/)
    work/[slug]/page.tsx       case study page (replaces app/work/gym-management-system)
proxy.ts                       "/" -> "/<locale>"
lib/locale.ts                  LOCALES, Locale, isLocale, negotiateLocale, switchLocalePath
content/
  types.ts                     SiteContent and all content types
  en.ts / es.ts                one SiteContent each
  index.ts                     getContent(locale)
  i18n.test.ts                 parity + typography
components/
  Navbar, LanguageSwitcher, Hero, CopyEmailButton, Work, CaseSummary, DecisionCard,
  CaseStudyPage, Skills, About, Contact, ContactForm, Footer, Section, Reveal
```

Deleted at the end: `content/site.ts`, `about.ts`, `projects.ts`, `skills.ts`, `contact.ts` (replaced by `content/en.ts`/`es.ts`; constants that are not copy, like `SITE_URL`, `WEB3FORMS_ACCESS_KEY`, `HONEYPOT_FIELD`, move to `content/config.ts`), `components/SplitHeading.tsx`, `FeaturedProject.tsx`, `ProjectCard.tsx`, `Projects.tsx`, `Eyebrow.tsx` if unused, `app/work/`, `app/fonts/Inter-*.woff`, `app/page.tsx`, `app/layout.tsx`.

---

### Task 1: Visual foundations (tokens, fonts, remove anime.js)

**Files:**
- Modify: `app/globals.css` (color tokens, `--font-sans`, add `--font-mono`, `--radius-*`, remove `--shadow-glow*` and panel/title glow rules)
- Modify: `content/brand.ts` (new values; drop `surface-sunken` if removed from CSS)
- Modify: `app/layout.tsx` (Schibsted_Grotesk + JetBrains_Mono via `next/font/google`, variables `--font-schibsted`, `--font-jetbrains`)
- Modify: `components/Section.tsx` (plain `<h2>` with trailing accent period; no SplitHeading)
- Delete: `components/SplitHeading.tsx` and its test; `animejs` from `package.json`
- Test: `content/brand.test.ts` (existing, must pass), `components/Section.test.tsx` (new)

**Interfaces:**
- Produces: Tailwind utilities `bg-background bg-surface border-border text-foreground text-muted text-accent font-sans font-mono rounded-sm(4px) rounded-full`. `Section({ id, title, children })` unchanged signature.

- [ ] **Step 1: Write failing tests**
  - `Section.test.tsx` › `renders the title as an h2 with id-based aria-labelledby and a trailing accent period`: `getByRole('heading', { level: 2 })` has text `Work.`; the period is a `<span>` with class `text-accent` and `aria-hidden="true"`.
  - `brand.test.ts` stays as is; update `BRAND` expectations by editing `brand.ts` only after the CSS change.
  - Add to `brand.test.ts` › `globals.css has no glow tokens left`: `expect(css).not.toMatch(/--shadow-glow/)`.
- [ ] **Step 2: Run** `npx vitest run components/Section.test.tsx content/brand.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement** tokens with the exact Global Constraints hex values; fonts; `Section` heading; remove glow CSS, SplitHeading and `npm uninstall animejs`. Add the shared micro-interactions in `globals.css`: `.link-evidence` (accent underline that grows from 1px to 2px and a `↗` that shifts 2px on hover, 150ms ease-out) and `:active { transform: scale(0.98) }` for pill buttons; retune `Reveal` to 8px rise, 300ms, ease-out. All inside `prefers-reduced-motion: no-preference`.
- [ ] **Step 4: Run** `npm test && npm run lint && npm run build`. Expected: all green (other component tests that asserted glow classes get updated in this step, not deleted).
- [ ] **Step 5: Verify visually** with gstack `/browse` at 1440 and 375 on `http://localhost:3000`: new palette and fonts, no glow, no console errors. Screenshot both.
- [ ] **Step 6: Commit** `style(design): switch to the Casebook palette and type, drop anime.js`

### Task 2: Typed bilingual content

**Files:**
- Create: `content/types.ts`, `content/en.ts`, `content/es.ts`, `content/index.ts`, `content/config.ts`, `content/i18n.test.ts`
- Modify: `content/site.test.ts`, `content/projects.test.ts` (iterate both locales, read from `getContent`)
- Test: `content/i18n.test.ts`

**Interfaces:**
- Consumes: `Locale` from `lib/locale.ts` (create the file here with only `export const LOCALES = ["en", "es"] as const; export type Locale = (typeof LOCALES)[number]; export function isLocale(value: string): value is Locale`; Task 3 extends it).
- Produces:
  ```ts
  type Link = { label: string; href: string };
  type Decision = { title: string; why: string; evidence: Link };
  type Screenshot = { src: string; alt: string; caption?: string; width: number; height: number };
  type CaseStudy = {
    slug: "falber" | "gym-management-system";
    title: string; kind: string;            // e.g. "Solo project · in production"
    summary: string; problem: string; role: string; team?: string;
    aiWorkflow?: string;                     // FALBER only, fixed sentence
    stack: string[]; links: Link[];
    decisions: Decision[];                   // >= 3; decisions[0] is the one shown on home
    gallery: Screenshot[];                   // gallery[0] is the home image
  };
  type SkillGroup = { title: string; items: string[]; usedIn: Link[] };
  type SiteContent = {
    locale: Locale;
    meta: { title: string; description: string };
    nav: { work: string; skills: string; about: string; contact: string; cv: string; switchTo: string };
    hero: { role: string; valueProp: string; status: string; cvLabel: string; copyLabel: string; copiedLabel: string; copyFailedLabel: string };
    work: { title: string; readCase: string; backToWork: string; sections: { problem: string; role: string; team: string; decisions: string; gallery: string } };
    cases: CaseStudy[];                      // order: falber, gym-management-system
    skills: { title: string; usedInLabel: string; groups: SkillGroup[] };
    about: { title: string; bio: string; howIWork: string[]; freelance: string; educationTitle: string; degree: {...}; certifications: {...}[] };
    contact: { title: string; availability: string; intro: string; formTitle: string; form: {/* current CONTACT_COPY keys */} };
    footer: { builtWith: string };
  };
  getContent(locale: Locale): SiteContent
  // content/config.ts
  SITE_URL, PERSON = { name: "Facundo Lambertucci", email: "faculambertucci98@gmail.com" },
  SOCIAL_LINKS, CV_FILES: Record<Locale, string>, WEB3FORMS_ACCESS_KEY, HONEYPOT_FIELD
  ```
- Content source rules: decisions come from spec §4.3 with real file/commit links (`https://github.com/facu-l/landing-falber/blob/main/supabase/migrations/0001_initial_schema.sql`, `.../decant-manager/blob/main/tests/test_money.py`, etc.; verify each URL resolves before committing). CEF decisions are drafted from the current case study and marked for Facundo's validation in the commit message. Bio drops "building toward AI engineering". Skills without public evidence (Express) are dropped.

- [ ] **Step 1: Write failing tests** in `content/i18n.test.ts`:
  - `both locales list the same case slugs in the same order`: `en.cases.map(c=>c.slug)` equals es, equals `["falber","gym-management-system"]`.
  - `each case has the same number of decisions and gallery images in both locales, at least 3 decisions`.
  - `evidence and link hrefs are identical across locales` (only labels are translated).
  - `no string is empty` (deep walk over both objects).
  - `no em-dash or en-dash anywhere`: deep walk, `expect(str).not.toMatch(/[—–]/)`.
  - `FALBER carries the fixed AI-workflow sentence in English`: `en.cases[0].aiWorkflow` equals the Global Constraints sentence.
  - `the bio no longer promises AI engineering`: `expect(en.about.bio).not.toMatch(/AI engineering/i)`.
  - `the CEF case credits the Rust backend to a teammate`: `en.cases[1].role` matches `/teammate/`, es matches `/compañero/`.
  - `every gallery src exists in public/` (reuse the existing projects.test helper).
- [ ] **Step 2: Run** `npx vitest run content/`. Expected: FAIL (module not found).
- [ ] **Step 3: Implement** types, both content files, `getContent`, `config.ts`. Copy screenshots: Decant Manager from `C:/Users/Facu/Desktop/Workspace/decant-manager/docs/screenshots/{dashboard,calculadora}.png` to `public/proyectos/decant-*.png`; FALBER captured with gstack `/browse` from `https://falber.com.ar` (home + product + cart, 1440 wide) to `public/proyectos/falber-*.png`. Old content files stay until Task 5 removes their last consumers.
- [ ] **Step 4: Run** `npm test`. Expected: PASS.
- [ ] **Step 5: Commit** `feat(content): add typed EN/ES content with case decisions`

### Task 3: Locale routing, redirects and SEO

**Files:**
- Modify: `lib/locale.ts` (add `negotiateLocale`, `switchLocalePath`)
- Create: `proxy.ts`, `app/[lang]/layout.tsx`, `app/[lang]/page.tsx`, `lib/locale.test.ts`, `app/sitemap.test.ts`, `next.config.test.ts`
- Move: `app/opengraph-image.tsx` → `app/[lang]/opengraph-image.tsx` (restyle in Task 7)
- Delete: `app/layout.tsx`, `app/page.tsx`
- Modify: `app/sitemap.ts`, `next.config.ts` (add `redirects()`)

**Interfaces:**
- Produces:
  - `negotiateLocale(acceptLanguage: string | null): Locale` — first language range (by q, then order) whose primary subtag is a supported locale; default `"en"`.
  - `switchLocalePath(pathname: string, target: Locale): string` — replaces the first segment if it is a locale (`/es/work/falber` → `/en/work/falber`), else prefixes.
  - `app/[lang]/layout.tsx`: `generateStaticParams()` → `[{lang:"en"},{lang:"es"}]`, `export const dynamicParams = false`, `generateMetadata` with `alternates: { languages: { en: "/en", es: "/es" }, canonical: "/<lang>" }`, `<html lang={lang}>`.
  - `app/[lang]/page.tsx` receives `{ params }: PageProps<'/[lang]'>`, calls `getContent(lang)` and passes `content` to every section component as `content: SiteContent` (or the slice it needs).
  - `proxy.ts`: `export function proxy(request)`, `config.matcher = ['/']`, redirects (307) to `/${negotiateLocale(header)}`.

- [ ] **Step 1: Write failing tests**
  - `lib/locale.test.ts` › `negotiateLocale`: `("es-AR,es;q=0.9,en;q=0.8")→"es"`, `("en-US,en;q=0.9")→"en"`, `(null)→"en"`, `("fr-FR")→"en"`, `("pt-BR, es;q=0.5")→"es"`, `("*")→"en"`, `("garbage;;q=")→"en"`, `("en;q=0.2, es;q=0.8")→"es"`.
  - `switchLocalePath`: `("/es/work/falber","en")→"/en/work/falber"`, `("/en","es")→"/es"`, `("/","es")→"/es"`.
  - `isLocale("EN")` is false, `isLocale("fr")` is false.
  - `next.config.test.ts` › `the old case-study URL redirects permanently to the English page`: `await config.redirects()` contains `{ source: "/work/gym-management-system", destination: "/en/work/gym-management-system", permanent: true }`.
  - `app/sitemap.test.ts` › `lists home and every case in both locales, each with hreflang alternates`: URLs include `/en`, `/es`, `/en/work/falber`, `/es/work/gym-management-system`; every entry has `alternates.languages.en` and `.es`.
- [ ] **Step 2: Run** `npx vitest run lib app next.config.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement** per Interfaces. Unknown locale → `dynamicParams=false` yields 404; also call `notFound()` if `!isLocale(lang)`.
- [ ] **Step 4: Run** `npm test && npm run build`. Build output must list `/en` and `/es` as static (SSG).
- [ ] **Step 5: Verify** with gstack `/browse`: `/` with `Accept-Language: es-AR` lands on `/es`; `/fr` is 404; `/work/gym-management-system` ends at `/en/work/...` (page may still be the old design until Task 6, a 404 here is acceptable only until Task 6).
- [ ] **Step 6: Commit** `feat(i18n): serve /en and /es with locale negotiation and hreflang`

### Task 4: Navbar, language switcher and hero

**Files:**
- Modify: `components/Navbar.tsx`, `components/Hero.tsx`, their tests
- Create: `components/LanguageSwitcher.tsx` (client, `usePathname`), `components/CopyEmailButton.tsx` (client) + tests
- Delete: `components/SocialIconLinks.tsx`, `components/CvDownload.tsx` if no longer used (CV choice moves to Contact)

**Interfaces:**
- Consumes: `SiteContent["nav" | "hero"]`, `PERSON`, `CV_FILES`, `switchLocalePath`.
- Produces: `CopyEmailButton({ email, copyLabel, copiedLabel, copyFailedLabel }: {...})`, reused by Contact in Task 7.

Hero layout: grid `1.5fr 1fr` from `md`, one column below; text block: `h1` = role + accent period, value prop (spec §3 exact), status line (mono, accent dot as the only status dot on the page), CTAs `Download CV` (primary pill, `href=CV_FILES[locale]`, `download`) and `CopyEmailButton` (ghost pill, mono, shows the email). Photo `public/foto-facu.jpg` grayscale, `priority`, 4px radius. Load-in: hero children fade + 8px rise, staggered 60ms, total <= 400ms, CSS keyframes gated by `prefers-reduced-motion: no-preference`.

- [ ] **Step 1: Write failing tests**
  - `Hero.test.tsx` › `shows role, value prop and status from content` for both locales; `the CV link points to the PDF of the current locale and has the download attribute`; `the email is visible as text`.
  - `CopyEmailButton.test.tsx` › `copies the email and announces it`: mock `navigator.clipboard.writeText` resolving; click; `writeText` called with `"faculambertucci98@gmail.com"`; `getByRole('status')` has `copiedLabel`; after `vi.advanceTimersByTime(1500)` label returns to `copyLabel`.
  - › `when the clipboard rejects or is missing, shows the failure label and keeps a mailto link`: `navigator.clipboard = undefined`; click does not throw; status shows `copyFailedLabel`; `getByRole('link', { name: /faculambertucci98@gmail.com/ })` has `href="mailto:faculambertucci98@gmail.com"`.
  - `LanguageSwitcher.test.tsx` › `links to the same page in the other locale` (mock `usePathname` → `/es/work/falber`; link href `/en/work/falber`, `hrefLang="en"`, visible label `EN`).
  - `Navbar.test.tsx` › `renders on one line of links: Work, Skills, About, Contact` from content and `the name ends in an accent period`.
- [ ] **Step 2: Run** `npx vitest run components/Hero components/CopyEmailButton components/LanguageSwitcher components/Navbar`. Expected: FAIL.
- [ ] **Step 3: Implement.** Copy uses `navigator.clipboard?.writeText` inside try/catch; `role="status"` + `aria-live="polite"`; timer cleared on unmount.
- [ ] **Step 4: Run** `npm test && npm run lint`. Expected: PASS.
- [ ] **Step 5: Verify** with gstack `/browse` at 1440 and 375, both locales: hero fits the first viewport at 1440x900 (headline <= 2 lines, CTAs visible), no horizontal scroll at 375, focus ring visible in accent when tabbing.
- [ ] **Step 6: Commit** `feat(hero): lead with role, availability, CV and copyable email`

### Task 5: Work section on the home page

**Files:**
- Create: `components/Work.tsx`, `components/CaseSummary.tsx`, `components/DecisionCard.tsx` + tests
- Delete: `components/Projects.tsx`, `FeaturedProject.tsx`, `ProjectCard.tsx` and tests; `content/projects.ts`, `content/projects.test.ts` (logic moved to `i18n.test.ts`)

**Interfaces:**
- Consumes: `SiteContent["work" | "cases"]`, `TechStack`, `ExternalLink`.
- Produces: `DecisionCard({ decision, index, total, label }: { decision: Decision; index: number; total: number; label: string })` (label like "Decision" / "Decisión"), reused by Task 6.

Layout per case: title with accent period, mono meta line (kind + links with accent underline), summary (<= 2 sentences), grid `1.3fr 1fr`: `gallery[0]` image + `DecisionCard` with `decisions[0]`, then "Read the case study" link to `/${locale}/work/${slug}`. The two cases must not use the identical layout: CEF mirrors the grid (decision left, image right) and adds the team line.

- [ ] **Step 1: Write failing tests**
  - `Work.test.tsx` › `renders both cases in order with exactly one decision each` (`getAllByRole('article')` length 2; within each, one element with text `Decision 1 of N`).
  - › `each case links to its case page in the current locale` (`/es/work/falber` for es).
  - › `external links open in a new tab with rel noopener` (reuse `ExternalLink`).
  - `DecisionCard.test.tsx` › `shows label, title, why and an evidence link with its href`.
- [ ] **Step 2: Run** targeted vitest. Expected: FAIL.
- [ ] **Step 3: Implement** and wire `Work` into `app/[lang]/page.tsx` as `#work`.
- [ ] **Step 4: Run** `npm test && npm run build`. Expected: PASS.
- [ ] **Step 5: Verify** gstack 1440/375 both locales; images not stretched (explicit width/height), CLS-free.
- [ ] **Step 6: Commit** `feat(work): present FALBER and CEF as cases with a featured decision`

### Task 6: Case study pages

**Files:**
- Create: `app/[lang]/work/[slug]/page.tsx`, `components/CaseStudyPage.tsx` + test
- Delete: `app/work/gym-management-system/page.tsx`

**Interfaces:**
- Consumes: `getContent`, `DecisionCard`, `isLocale`.
- Produces: route with `generateStaticParams()` → 4 combinations (2 locales x 2 slugs), `dynamicParams = false`, `generateMetadata` with title `${case.title} · ${PERSON.name}` and `alternates.languages`.

Page sections in order: back link (`work.backToWork` → `/${locale}#work`), title + kind + links, problem, role (+ team for CEF), AI workflow note (FALBER only, styled as a bordered note, mono label), all decisions as `DecisionCard`s, gallery with captions, stack.

- [ ] **Step 1: Write failing tests** (`CaseStudyPage.test.tsx`):
  - `FALBER page shows every decision and the AI-workflow sentence`.
  - `CEF page shows the team line and credits the Rust backend to a teammate`, and `has no AI-workflow note`.
  - `the back link targets the work section of the same locale`.
- [ ] **Step 2: Run** targeted vitest. Expected: FAIL.
- [ ] **Step 3: Implement.** Unknown slug → `notFound()`.
- [ ] **Step 4: Run** `npm test && npm run build`. Build lists 4 static case pages.
- [ ] **Step 5: Verify** gstack: `/work/gym-management-system` → 308 → `/en/work/gym-management-system` renders; `/es/work/falber` at 375 has no horizontal scroll; every evidence link returns 200 (gstack or `curl -I`).
- [ ] **Step 6: Commit** `feat(work): add bilingual case study pages with decisions`

### Task 7: Skills, About, Contact, footer and OG image

**Files:**
- Modify: `components/Skills.tsx`, `About.tsx`, `Contact.tsx`, `ContactForm.tsx`, `ContactFallback.tsx`, `Footer.tsx`, `app/[lang]/opengraph-image.tsx`, their tests
- Create: `app/fonts/SchibstedGrotesk-ExtraBold.ttf`, `app/fonts/JetBrainsMono-Regular.ttf` (from the `google/fonts` GitHub repo, OFL; OG `ImageResponse` cannot read woff2)
- Delete: `content/site.ts`, `about.ts`, `skills.ts`, `contact.ts`, `brand.ts` consumers that moved, `components/Panel.tsx`/`IconBadge.tsx`/`icons.tsx` skill icons if unused, `app/fonts/Inter-*.woff`

**Interfaces:**
- Consumes: `SiteContent["skills" | "about" | "contact" | "footer"]`, `CopyEmailButton`, `CV_FILES`, `SOCIAL_LINKS`, `PERSON`.

Skills: groups as a 2-column grid (not 3 equal cards), each with items in mono and a "Used in" line of links. About: bio, "How I work" as 3 short statements, education (degree + 2 certifications; Talento Tech keeps "View the API"), freelance line last. Contact: availability ("Available now" / "Disponible ahora"), email with `CopyEmailButton`, CV links ES and EN, LinkedIn, GitHub; the Web3Forms form below under `contact.formTitle`. OG: 1200x630, background `#0c0d0f`, name in Schibsted 800, role, accent period, one per locale.

- [ ] **Step 1: Write failing tests**
  - `Skills.test.tsx` › `every group shows a Used in line whose links are case pages of the current locale or https URLs`; › `the Java group links to articulos-api and says course project`.
  - `About.test.tsx` › `shows bio, how-I-work statements, education and the freelance line last`; › `Talento Tech links to the API repo`.
  - `Contact.test.tsx` › `shows availability, the email with copy button, both CVs and the form below`; existing ContactForm tests keep passing with copy from `content.contact.form`.
  - `Footer.test.tsx` › updated to new content.
- [ ] **Step 2: Run** targeted vitest. Expected: FAIL.
- [ ] **Step 3: Implement**, then delete the old content files and orphan components; `grep -r "content/site\|content/about\|content/skills\|content/contact\|animejs\|Inter" app components content lib` returns nothing.
- [ ] **Step 4: Run** `npm test && npm run lint && npm run build`. Expected: PASS.
- [ ] **Step 5: Verify** gstack 1440/375 both locales; open `/en/opengraph-image` and `/es/opengraph-image` and look at them.
- [ ] **Step 6: Commit** `feat(sections): rebuild skills, about and contact around evidence`

### Task 8: Docs and full QA

**Files:**
- Modify: `CLAUDE.md` (drop `liquid-gooey` and the unversioned-design-doc line; point to the spec), `README.md` (stack, fonts, i18n, routes), `TODOS.md` (Currently Learning item: content now per locale)

- [ ] **Step 1: Run** gstack `/qa` on `http://localhost:3000` (production build via `npm run build && npm start`) for `/en`, `/es`, both case pages in both locales, at 1440x900 and 375x812. Check: no horizontal scroll, hero fits first viewport at desktop, nav on one line at 1024, focus visible, no console errors, `prefers-reduced-motion: reduce` shows final state with no animation.
- [ ] **Step 2: Run** gstack `/benchmark` (or Lighthouse) on `/en` desktop and mobile. Expected: Performance, Accessibility, Best Practices, SEO >= 95; LCP < 2.5s; CLS < 0.1. Fix and re-run if not.
- [ ] **Step 3: Contrast check** of `#8b9099` on `#0c0d0f` and on `#141518`, and `#0c0d0f` on `#c8f03c`: all >= 4.5:1. Adjust muted only if one fails.
- [ ] **Step 4: Copy review handoff:** list for Facundo every CEF decision and both bios (EN/ES) to validate before publishing.
- [ ] **Step 5: Commit** `docs: describe the bilingual Casebook portfolio`
