import type { SiteContent } from "./types";

/**
 * Contenido en español (rioplatense, como habla Facundo).
 *
 * Mismas reglas que content/en.ts: cada decisión técnica linkea al código que
 * la prueba, y los href son idénticos a los del inglés. Si agregás algo acá,
 * agregalo también en en.ts: content/i18n.test.ts falla si quedan distintos.
 */

const FALBER_REPO = "https://github.com/facu-l/landing-falber/blob/main";
const DECANT_REPO = "https://github.com/facu-l/decant-manager/blob/main";
const CEF_REPO = "https://github.com/canizafa/sistema-cef";

export const es: SiteContent = {
  locale: "es",
  meta: {
    title: "Facundo Lambertucci · Desarrollador Full Stack",
    description:
      "Desarrollador Full Stack Junior de Argentina. Construyo aplicaciones web de punta a punta, desde las reglas de la base de datos hasta la interfaz, y las mantengo bajo tests.",
  },
  a11y: { opensInNewTab: "(se abre en una pestaña nueva)" },
  nav: {
    label: "Principal",
    skipToContent: "Saltar al contenido",
    work: "Proyectos",
    skills: "Skills",
    about: "Sobre mí",
    contact: "Contacto",
    cv: "CV",
    switchTo: "Read in English",
  },
  hero: {
    role: "Desarrollador Full Stack",
    valueProp:
      "Construyo aplicaciones web de punta a punta, desde las reglas de la base de datos hasta la interfaz, y las mantengo bajo tests.",
    status: "Buscando puesto Junior · Argentina y remoto · Full-time o part-time",
    cvLabel: "Descargar CV",
    copyLabel: "Copiar email",
    copiedLabel: "Email copiado",
    copyFailedLabel: "No se pudo copiar. Usá el link",
    photoAlt: "Retrato de Facundo Lambertucci",
  },
  work: {
    title: "Proyectos",
    readCase: "Leer el caso completo",
    backToWork: "Volver a proyectos",
    decisionLabel: "Decisión",
    ofLabel: "de",
    sections: {
      problem: "El problema",
      role: "Mi rol",
      team: "Equipo y forma de trabajo",
      aiWorkflow: "Cómo se construyó",
      decisions: "Decisiones",
      gallery: "Pantallas",
      stack: "Stack",
    },
  },
  cases: [
    {
      slug: "falber",
      title: "FALBER",
      kind: "Proyecto propio · en producción",
      summary:
        "Mi propia tienda de perfumes y los sistemas que la hacen funcionar: una tienda en Next.js y Supabase donde los pedidos se cierran por WhatsApp, y una app de escritorio en Python para stock, costos y márgenes.",
      problem:
        "Un decant es perfume fraccionado en 5 y 10 ml, así que el stock se cuenta en mililitros y los costos cambian con cada lote. Un número mal cargado significa vender lo que no tengo, o vender a pérdida. Necesitaba una tienda donde los clientes pudieran pedir y un sistema interno al que pudiera confiarle la plata.",
      role:
        "Todo, solo: el modelo de datos y sus reglas, la tienda, el panel de administración, los tests, el deploy y la app de escritorio. El sistema de diseño visual también es mío.",
      aiWorkflow:
        "Construido con un flujo de trabajo asistido por IA: tomé y documenté las decisiones de arquitectura (más de 120 en el registro de decisiones), revisé cada cambio y mantuve las reglas de negocio bajo tests para que el código generado no pudiera romperlas sin que me diera cuenta.",
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
        { label: "Repo de la tienda", href: "https://github.com/facu-l/landing-falber" },
        { label: "Repo del sistema interno", href: "https://github.com/facu-l/decant-manager" },
      ],
      decisions: [
        {
          title: "El stock solo cambia a través de un libro de movimientos, nunca editando un número.",
          why: "Cada cambio es una fila en stock_movements, y los pedidos solo se pueden crear con la función create_order. Las dos reglas viven en Postgres: aunque la app tenga un bug, la base rechaza un estado que no cierra.",
          evidence: {
            label: "Ver la migración 0001",
            href: `${FALBER_REPO}/supabase/migrations/0001_initial_schema.sql`,
          },
        },
        {
          title: "Los precios siempre salen del servidor, nunca del carrito.",
          why: "El carrito vive en el navegador, así que cualquiera puede editarlo. El checkout vuelve a leer cada producto del catálogo y bloquea el pedido si alguno no existe o no tiene stock.",
          evidence: {
            label: "Ver resolve.ts",
            href: `${FALBER_REPO}/src/lib/cart/resolve.ts`,
          },
        },
        {
          title: "Reintentar un pedido nunca crea uno nuevo.",
          why: "Cada checkout manda un request_id único. Si se corta la red y el cliente vuelve a enviar, la base devuelve el pedido que ya creó en vez de duplicarlo.",
          evidence: {
            label: "Ver la tabla de pedidos",
            href: `${FALBER_REPO}/supabase/migrations/0001_initial_schema.sql`,
          },
        },
        {
          title: "La plata nunca es un número de punto flotante.",
          why: "La app de escritorio guarda los montos como texto decimal y reparte los costos con 10 decimales, así lo que informa cada venta siempre suma exacto con los totales.",
          evidence: {
            label: "Ver test_money.py",
            href: `${DECANT_REPO}/tests/test_money.py`,
          },
        },
        {
          title: "Los costos siguen FIFO, y las ventas se anulan, nunca se borran.",
          why: "Cada venta consume primero el lote más viejo y guarda una foto de lo que costó ese día. Anular una venta la revierte dejando registro, así el historial se puede auditar.",
          evidence: {
            label: "Ver test_fifo.py",
            href: `${DECANT_REPO}/tests/test_fifo.py`,
          },
        },
      ],
      gallery: [
        {
          src: "/proyectos/falber-home.png",
          alt: "Home de la tienda FALBER con el logo y un frasco de perfume dorado sobre fondo negro",
          caption: "La tienda, en vivo en falber.com.ar.",
          width: 1440,
          height: 900,
        },
        {
          src: "/proyectos/falber-producto.png",
          alt: "Página de producto de FALBER para Dior Sauvage con precios de decants de 5 y 10 ml",
          caption: "Una página de producto: cada tamaño es una variante con su propio precio y stock.",
          width: 1440,
          height: 900,
        },
        {
          src: "/proyectos/decant-dashboard.png",
          alt: "Panel de Decant Manager con ingresos, costos, ganancia y stock del mes",
          caption: "El sistema interno de escritorio. Las cifras son datos de demo.",
          width: 1913,
          height: 1021,
        },
        {
          src: "/proyectos/decant-calculadora.png",
          alt: "Calculadora de Decant Manager con el costo real de un decant y un precio sugerido",
          caption: "La calculadora: costo real por decant y precio sugerido. Datos de demo.",
          width: 1891,
          height: 1021,
        },
      ],
    },
    {
      slug: "gym-management-system",
      title: "Sistema de gestión para un gimnasio",
      kind: "Equipo de 5 · cliente real",
      summary:
        "Una plataforma de gestión para un gimnasio real, con accesos separados para el dueño, recepción y los socios: membresías, clases, reservas, pagos y asistencia.",
      problem:
        "Construir un sistema completo desde cero para un cliente real, con tres roles que tienen necesidades y permisos distintos: el dueño, la recepción y los propios socios.",
      team:
        "Un equipo de 5 personas trabajando con Git Flow y ceremonias ágiles. Los cambios pasaban por pull requests y code review antes de llegar a la rama principal, lo que implicaba coordinar ramas entre cinco personas sin bloquearnos.",
      role:
        "Hice el lado del socio en el frontend, con React y TypeScript: membresías y el lado cliente del flujo de pago con Mercado Pago, el saldo de créditos de clases, las reservas con lista de espera y un QR por reserva para registrar la asistencia. El backend en Rust lo construyeron mis compañeros; mi trabajo fue el lado cliente de estos módulos y su integración con ese backend.",
      stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Rust (equipo)", "SQLite"],
      links: [
        { label: "Demo en vivo", href: "https://sistema-cef.vercel.app/" },
        { label: "Repo", href: CEF_REPO },
      ],
      decisions: [
        {
          title: "Una clase está llena cuando lo dicen sus reservas, no un campo aparte.",
          why: "La pantalla de membresías confiaba en un campo \"lleno\" guardado aparte, que podía desincronizarse de las reservas reales. La cambié para que compare las inscripciones contra el cupo, así lo que ve el socio coincide con las reservas.",
          evidence: {
            label: "Ver el commit",
            href: `${CEF_REPO}/commit/2ce08c8d224c306d5d166a4b4f7775b2a08f7bb6`,
          },
        },
        {
          title: "El QR de asistencia identifica una reserva, no el DNI del socio.",
          why: "El QR codificaba el DNI del socio: el mismo código para todas las clases y un documento personal a la vista. Lo cambié por un QR por reserva que codifica el id de la reserva, visible durante 15 minutos desde la pantalla de reservas.",
          evidence: {
            label: "Ver el commit",
            href: `${CEF_REPO}/commit/8890f71e817ddb7d26d82495597f721cafe73f21`,
          },
        },
        {
          title: "Pagar una membresía nunca reserva dos veces la misma clase.",
          why: "Si un socio ya había pagado una clase suelta y después compra una membresía que la incluye, el flujo saltea esa reserva en vez de duplicarla.",
          evidence: {
            label: "Ver el pull request 278",
            href: `${CEF_REPO}/pull/278`,
          },
        },
      ],
      gallery: [
        {
          src: "/proyectos/cef-landing.png",
          alt: "Landing pública del gimnasio CEF con el llamado a la acción para asociarse",
          caption: "El sitio público del gimnasio.",
          width: 1888,
          height: 910,
        },
        {
          src: "/proyectos/cef-clases.png",
          alt: "Grilla de clases del gimnasio con horarios y cupos disponibles",
          caption: "La grilla de clases con los cupos disponibles.",
          width: 1888,
          height: 912,
        },
        {
          src: "/proyectos/cef-membresia.png",
          alt: "Pantalla de membresías con los planes disponibles y su precio",
          caption: "Los planes de membresía, que se pagan con Mercado Pago.",
          width: 1494,
          height: 911,
        },
      ],
    },
  ],
  skills: {
    title: "Skills",
    usedInLabel: "Usado en",
    groups: [
      {
        title: "Frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML y CSS"],
        cases: ["falber", "gym-management-system"],
        links: [],
      },
      {
        title: "Backend y datos",
        items: ["PostgreSQL", "Supabase (RLS, RPC)", "SQL", "Python", "SQLite"],
        cases: ["falber"],
        links: [],
      },
      {
        title: "Java",
        items: ["Java", "Spring Boot", "JPA / Hibernate", "MySQL", "APIs REST"],
        cases: [],
        links: [
          {
            label: "articulos-api (proyecto de curso)",
            href: "https://github.com/facu-l/articulos-api-spring-boot",
          },
        ],
      },
      {
        title: "Testing y herramientas",
        items: ["Vitest", "Playwright", "pytest", "Git", "GitHub Actions", "Vercel", "Netlify"],
        cases: ["falber"],
        links: [],
      },
    ],
  },
  about: {
    title: "Sobre mí",
    bio: "Soy Desarrollador Full Stack Junior y estudiante de 3er año de la Licenciatura en Sistemas en la Universidad Nacional de La Plata (UNLP). Construyo aplicaciones web de punta a punta: el modelo de datos y sus reglas, el código del servidor y la interfaz. Tengo mi propia tienda de perfumes, FALBER, y construí tanto la tienda online como la app de escritorio que maneja su stock y sus costos. Antes de eso, trabajé en un equipo de cinco en un sistema de gestión para un gimnasio real.",
    howIWorkTitle: "Cómo trabajo",
    howIWork: [
      "Escribo las decisiones antes de programarlas, con el porqué, para que se puedan revisar y discutir.",
      "Las reglas de negocio llevan tests, sobre todo las que tocan plata o stock.",
      "Uso herramientas de IA para avanzar más rápido, y reviso cada cambio que generan antes de publicarlo.",
    ],
    freelance: "También tomo proyectos freelance chicos.",
    educationTitle: "Formación",
    degree: {
      title: "Licenciatura en Sistemas",
      institution: "Facultad de Informática, Universidad Nacional de La Plata",
      detail: "3er año",
    },
    certifications: [
      {
        title: "Desarrollo Back-End con Java",
        institution: "Talento Tech · Ministerio de Educación (GCBA)",
        detail: "80 horas · julio 2026",
        topics: "APIs REST con Spring Boot y MySQL, POO aplicada al backend",
        evidence: {
          label: "Ver la API",
          href: "https://github.com/facu-l/articulos-api-spring-boot",
        },
      },
      {
        title: "Fundamentos de AI Engineering con Python",
        institution: "Código Facilito",
        detail: "12 semanas · agosto 2026",
        topics: "Python para IA, fundamentos de modelos y flujos aplicados",
      },
    ],
  },
  contact: {
    title: "Contacto",
    availability: "Disponible ahora",
    intro:
      "Busco un puesto como Desarrollador Full Stack Junior, en Argentina o remoto, full-time o part-time. El email es la forma más rápida de contactarme.",
    cvTitle: "CV",
    elsewhereTitle: "En otros lados",
    formTitle: "O dejame un mensaje",
    form: {
      nameLabel: "Nombre",
      emailLabel: "Email",
      messageLabel: "Mensaje",
      submit: "Enviar mensaje",
      submitting: "Enviando...",
      success: "Gracias, tu mensaje ya está en camino. Te respondo pronto.",
      error: "Algo falló al enviar tu mensaje. Podés escribirme por LinkedIn:",
      unavailable: "La forma más rápida de contactarme:",
    },
  },
  footer: { builtWith: "Hecho con Next.js" },
  notFound: {
    title: "Esta página no existe",
    body: "Puede que el link sea viejo o tenga un error. Los proyectos y el contacto están en el inicio.",
    backHome: "Ir al inicio",
  },
};
