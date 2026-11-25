import type { SiteContent } from "./types";

/**
 * Contenido en inglés.
 *
 * Antes de editar: cada decisión técnica está respaldada por el archivo o el
 * commit que linkea. Si cambiás una afirmación, verificá que el link la siga
 * probando. En CEF, todo lo que dice "I" está chequeado contra los commits de
 * Facundo (frontend del socio); el backend Rust fue de sus compañeros.
 */

const FALBER_REPO = "https://github.com/facu-l/landing-falber/blob/main";
const DECANT_REPO = "https://github.com/facu-l/decant-manager/blob/main";
const CEF_REPO = "https://github.com/canizafa/sistema-cef";

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Facundo Lambertucci · Junior Full Stack Developer",
    description:
      "Junior Full Stack Developer from Argentina. I build web apps end to end, from the database rules to the interface, and keep them under test.",
  },
  a11y: { opensInNewTab: "(opens in a new tab)" },
  nav: {
    label: "Main",
    skipToContent: "Skip to content",
    work: "Work",
    skills: "Skills",
    about: "About",
    contact: "Contact",
    cv: "CV",
    switchTo: "Leer en español",
  },
  hero: {
    role: "Junior Full Stack Developer",
    valueProp:
      "I build web apps end to end, from the database rules to the interface, and keep them under test.",
    status: "Open to work · Argentina & remote · Full-time or part-time",
    cvLabel: "Download CV",
    copyLabel: "Copy email",
    copiedLabel: "Email copied",
    copyFailedLabel: "Couldn't copy. Use the link instead",
    photoAlt: "Portrait of Facundo Lambertucci",
  },
  work: {
    title: "Work",
    readCase: "Read the case study",
    backToWork: "Back to work",
    decisionLabel: "Decision",
    ofLabel: "of",
    sections: {
      problem: "The problem",
      role: "My role",
      team: "Team and workflow",
      aiWorkflow: "How it was built",
      decisions: "Decisions",
      gallery: "Screens",
      stack: "Stack",
    },
  },
  cases: [
    {
      slug: "falber",
      title: "FALBER",
      kind: "Solo project · in production",
      summary:
        "My own fragrance store and the systems that run it: a Next.js and Supabase storefront where orders close on WhatsApp, and a Python desktop app for stock, costs and margins.",
      problem:
        "Decants are perfume split into 5 and 10 ml portions, so stock is counted in milliliters and costs change with every batch. One wrong number means selling what I don't have, or selling at a loss. I needed a storefront customers could order from and a back office I could trust with money.",
      role:
        "All of it, on my own: the data model and its rules, the storefront, the admin panel, the tests, the deployment and the desktop app. The visual design system is mine too.",
      aiWorkflow:
        "Built with an AI-assisted workflow: I made and documented the architecture decisions (more than 120 in the decision log), reviewed every change, and kept the business rules under test so that generated code couldn't silently break them.",
      stack: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Tailwind CSS",
        "Vitest",
        "Playwright",
        "Python",
        "SQLite",
        "pytest",
      ],
      links: [
        { label: "falber.com.ar", href: "https://falber.com.ar" },
        { label: "Store repo", href: "https://github.com/facu-l/landing-falber" },
        { label: "Back office repo", href: "https://github.com/facu-l/decant-manager" },
      ],
      decisions: [
        {
          title: "Stock only changes through a ledger, never by editing a number.",
          why: "Every change is a row in stock_movements, and orders can only be created through the create_order function. Both rules live in Postgres, so even if the app has a bug, the database refuses a state that doesn't add up.",
          evidence: {
            label: "See migration 0001",
            href: `${FALBER_REPO}/supabase/migrations/0001_initial_schema.sql`,
          },
        },
        {
          title: "Prices always come from the server, never from the cart.",
          why: "The cart lives in the browser, so anyone can edit it. Checkout reads every item again from the catalog and blocks the order if a product is missing or out of stock.",
          evidence: {
            label: "See resolve.ts",
            href: `${FALBER_REPO}/src/lib/cart/resolve.ts`,
          },
        },
        {
          title: "A retried order never creates a second one.",
          why: "Each checkout sends a unique request_id. If the network fails and the customer submits again, the database returns the order it already created instead of duplicating it.",
          evidence: {
            label: "See the orders table",
            href: `${FALBER_REPO}/supabase/migrations/0001_initial_schema.sql`,
          },
        },
        {
          title: "Money is never a float.",
          why: "The desktop app stores amounts as decimal text and spreads costs with 10 decimal places, so what each sale reports always adds up exactly to the totals.",
          evidence: {
            label: "See test_money.py",
            href: `${DECANT_REPO}/tests/test_money.py`,
          },
        },
        {
          title: "Costs follow FIFO, and sales are voided, never deleted.",
          why: "Each sale uses up the oldest batch first and keeps a snapshot of what it cost that day. Cancelling a sale reverses it with a record, so the history stays auditable.",
          evidence: {
            label: "See test_fifo.py",
            href: `${DECANT_REPO}/tests/test_fifo.py`,
          },
        },
      ],
      gallery: [
        {
          src: "/proyectos/falber-home.png",
          alt: "FALBER store home page with the logo and a gold perfume bottle on a black background",
          caption: "The storefront, live at falber.com.ar. The store itself is in Spanish.",
          width: 1440,
          height: 900,
        },
        {
          src: "/proyectos/falber-producto.png",
          alt: "FALBER product page for Dior Sauvage with 5 ml and 10 ml decant prices",
          caption: "A product page: each size is a variant with its own price and stock.",
          width: 1440,
          height: 900,
        },
        {
          src: "/proyectos/decant-dashboard.png",
          alt: "Decant Manager dashboard with revenue, costs, profit and stock for the month",
          caption: "The desktop back office. Figures are demo data.",
          width: 1913,
          height: 1021,
        },
        {
          src: "/proyectos/decant-calculadora.png",
          alt: "Decant Manager price calculator showing the real cost of a decant and a suggested price",
          caption: "The calculator: real cost per decant and a suggested price. Demo data.",
          width: 1891,
          height: 1021,
        },
      ],
    },
    {
      slug: "gym-management-system",
      title: "Gym Management System",
      kind: "Team of 5 · real client",
      summary:
        "A management platform for a real gym, with separate access for the owner, front-desk staff and members: memberships, classes, bookings, payments and check-in.",
      problem:
        "Building a complete system from scratch for a real client, serving three roles with different needs and permissions: the owner, the front-desk staff and the members themselves.",
      team:
        "A 5-person team working with Git Flow and agile ceremonies. Changes went through pull requests and code review before reaching the main branch, which meant coordinating branches across five people without blocking each other.",
      role:
        "I built the members' side of the frontend in React and TypeScript: memberships and the client side of the Mercado Pago payment flow, the class credit balance, bookings with a waiting list, and a QR code per booking for check-in. The Rust backend was built by my teammates; my work was the client side of these modules and their integration with it.",
      stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Rust (team)", "SQLite"],
      links: [
        { label: "Live demo", href: "https://sistema-cef.vercel.app/" },
        { label: "Repo", href: CEF_REPO },
      ],
      decisions: [
        {
          title: "A class is full when its bookings say so, not when a flag says so.",
          why: "The membership screen trusted a stored \"full\" flag that could drift from the real bookings. I changed it to compare enrollments against capacity, so what the member sees matches the actual bookings.",
          evidence: {
            label: "See the commit",
            href: `${CEF_REPO}/commit/2ce08c8d224c306d5d166a4b4f7775b2a08f7bb6`,
          },
        },
        {
          title: "The check-in QR identifies a booking, not the member's ID.",
          why: "The QR used to encode the member's DNI (Argentina's national ID number): the same code for every class, and a personal document on screen. I changed it to one QR per booking that encodes the booking id, shown for 15 minutes from the bookings page.",
          evidence: {
            label: "See the commit",
            href: `${CEF_REPO}/commit/8890f71e817ddb7d26d82495597f721cafe73f21`,
          },
        },
        {
          title: "Paying a membership never books the same class twice.",
          why: "If a member had already paid for a class on its own and then bought a membership that includes it, the flow skips that booking instead of creating a duplicate.",
          evidence: {
            label: "See pull request 278",
            href: `${CEF_REPO}/pull/278`,
          },
        },
      ],
      gallery: [
        {
          src: "/proyectos/cef-landing.png",
          alt: "Public landing page of the CEF gym with a call to action to join",
          caption: "The gym's public site. The product is in Spanish.",
          width: 1888,
          height: 910,
        },
        {
          src: "/proyectos/cef-clases.png",
          alt: "Gym class schedule with times and available spots",
          caption: "Class schedule with available spots.",
          width: 1888,
          height: 912,
        },
        {
          src: "/proyectos/cef-membresia.png",
          alt: "Membership screen with the available plans and their prices",
          caption: "Membership plans, paid with Mercado Pago.",
          width: 1494,
          height: 911,
        },
      ],
    },
  ],
  skills: {
    title: "Skills",
    usedInLabel: "Used in",
    groups: [
      {
        title: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS"],
        cases: ["falber", "gym-management-system"],
        links: [],
      },
      {
        title: "Backend and data",
        items: ["PostgreSQL", "Supabase (RLS, RPC)", "SQL", "Python", "SQLite"],
        cases: ["falber"],
        links: [],
      },
      {
        title: "Java",
        items: ["Java", "Spring Boot", "JPA / Hibernate", "MySQL", "REST APIs"],
        cases: [],
        links: [
          {
            label: "articulos-api (course project)",
            href: "https://github.com/facu-l/articulos-api-spring-boot",
          },
        ],
      },
      {
        title: "Testing and tooling",
        items: ["Vitest", "Playwright", "pytest", "Git", "GitHub Actions", "Vercel", "Netlify"],
        cases: ["falber"],
        links: [],
      },
    ],
  },
  about: {
    title: "About",
    bio: "I'm a Junior Full Stack Developer and a 3rd-year Systems student at Universidad Nacional de La Plata (UNLP). I build web applications end to end: the data model and its rules, the server code and the interface. I run my own fragrance store, FALBER, and built both its online shop and the desktop app that manages its stock and costs. Before that, I worked in a team of five on a management system for a real gym.",
    howIWorkTitle: "How I work",
    howIWork: [
      "I write decisions down before I code them, with the reason, so they can be reviewed and questioned.",
      "Business rules get tests, especially the ones that touch money or stock.",
      "I use AI tools to move faster, and I review every change they produce before it ships.",
    ],
    freelance: "I also take on small freelance projects.",
    educationTitle: "Education",
    degree: {
      title: "Licenciatura en Sistemas",
      institution: "Facultad de Informática, Universidad Nacional de La Plata",
      detail: "3rd year",
    },
    certifications: [
      {
        title: "Back-End Development with Java",
        institution: "Talento Tech · Ministerio de Educación (GCBA)",
        detail: "80 hours · July 2026",
        topics: "REST APIs with Spring Boot and MySQL, OOP applied to the backend",
        evidence: {
          label: "View the API",
          href: "https://github.com/facu-l/articulos-api-spring-boot",
        },
      },
      {
        title: "AI Engineering Fundamentals with Python",
        institution: "Código Facilito",
        detail: "12 weeks · August 2026",
        topics: "Python for AI, model fundamentals and applied workflows",
      },
    ],
  },
  contact: {
    title: "Contact",
    availability: "Available now",
    intro:
      "I'm looking for a Junior Full Stack role, in Argentina or remote, full-time or part-time. Email is the fastest way to reach me.",
    cvTitle: "CV",
    elsewhereTitle: "Elsewhere",
    formTitle: "Or leave a message",
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Send message",
      submitting: "Sending...",
      success: "Thanks, your message is on its way. I'll get back to you soon.",
      error: "Something went wrong sending your message. You can reach me on LinkedIn instead:",
      unavailable: "The fastest way to reach me:",
    },
  },
  footer: { builtWith: "Built with Next.js" },
  notFound: {
    title: "This page doesn't exist",
    body: "The link may be old or mistyped. The work and the contact details are on the home page.",
    backHome: "Go to the home page",
  },
};
