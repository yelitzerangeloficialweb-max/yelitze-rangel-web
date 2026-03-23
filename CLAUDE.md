# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture Overview

**Next.js 15 App Router** coaching/personal-branding platform with AI integration, e-commerce, and event management.

### Route Groups

- `app/(website)/` — Main site layout with navbar/footer
  - `(routes)/` — All public pages (servicios, tienda, test-somatico, eventos, blog, contacto, etc.)
  - `admin/` — Admin dashboards (Venezuela tour registrations, products)
- `app/(focus)/` — Focused layout (no navbar) for `arquitectura-de-vida-intencional` (vision board tool)
- `app/maintenance/` — Maintenance mode page (currently active — see below)

### Maintenance Mode

The site is currently **gated behind maintenance mode**. In [middleware.ts](middleware.ts), `maintenanceMode` is hardcoded to `true`, overriding the `MAINTENANCE_MODE` env var. Access requires the cookie `yelitze_access_session_v2`, set via `/api/auth/maintenance` with the password from `SITE_PASSWORD`.

### Key Data Flows

**AI Features** (all under `app/api/ai/`):
- **Somatic Test** (`/test-somatico`): Quiz → `/api/ai/somatic-test` (Gemini analysis + PDF) → email via `/api/ai/somatic-test/send-email` (Resend)
- **Vision Board** (`/arquitectura-de-vida-intencional`): Multi-step form → AI text refinement (`/api/ai/refine-text`, `/api/ai/refine-intention`) → symbol/pillar image generation → PDF export
- **Diagnostic Tests** (`/amor-result`, `/dinero-result`, `/heridas-result`): Quiz results stored via API → Gemini analysis

**E-commerce**: Products defined in [lib/products-data.ts](lib/products-data.ts), cart state in [context/CartContext.tsx](context/CartContext.tsx) (localStorage), orders via Prisma.

**Database** (SQLite + Prisma): Models — `TestResult`, `Product`, `Order`, `OrderItem`, `SanateMujerRegistration`, `VenezuelaEnElCuerpoRegistration`. Run `npx prisma migrate dev` for schema changes.

**Email** (Resend): All templates in [lib/mail.ts](lib/mail.ts).

### Component Organization

```
components/
├── home/            # Homepage sections (NewHero, ServiceSelector, etc.)
├── vision-board/    # Vision board wizard steps
├── test-somatico/   # Somatic quiz UI
├── [amor|dinero|heridas]-test/  # Diagnostic test components
├── admin/           # Admin UI tables/forms
├── layout/          # Navbar, footer
└── ui/              # Shared UI primitives
```

Static content (blog posts, diagnostic questions, test data) lives in `lib/*-data.ts` files.

### Design System

- **Colors**: Primary brown `#8C4005`, background warm off-white `#F5EFE6`, text dark brown `#2D2926`
- **Fonts**: Playfair (headings), Inter (body), Allison (script), Cormorant (editorial)
- **Animations**: Framer Motion for transitions, GSAP for complex sequences
- **Styling**: Tailwind CSS with CSS custom properties for theming

### Environment Variables

```
DATABASE_URL          # SQLite: "file:./dev.db"
MAINTENANCE_MODE      # Overridden by middleware hardcode
SITE_PASSWORD         # Maintenance mode access password
RESEND_API_KEY        # Email delivery
OPENAI_API_KEY        # GPT models (text refinement, image generation)
GOOGLE_GEMINI_API_KEY # Gemini (test analysis, symbol generation)
```

### Deployment

Docker with multi-stage build, `output: "standalone"` in [next.config.ts](next.config.ts). Prisma migrations run on container startup.

## Estándares de Código

### TypeScript

- `strict: true` está habilitado en [tsconfig.json](tsconfig.json) — no introducir `any` excepto en bloques `catch` donde es inevitable.
- Definir siempre una `interface` nombrada para props de componentes (no tipos inline ni `React.FC`).
- Exportar componentes con `export default function NombreComponente`, no como expresiones de flecha exportadas.
- En API routes usar `error: unknown` en catch y hacer type narrowing, o limitar `error: any` solo cuando se accede a `.message` / `.stack`.
- Usar el alias `@/` para todas las importaciones internas (ej. `@/lib/mail`, `@/components/ui/EventCard`).

### Tailwind CSS y diseño

Usar siempre las variables CSS del sistema de diseño en lugar de valores hardcodeados:

| Propósito | Variable CSS | Tailwind inline |
|---|---|---|
| Títulos / autoridad | `--color-primary` (#8C4005) | `text-[var(--color-primary)]` |
| Botones / acentos | `--color-accent` (#B8835A) | `bg-[var(--color-accent)]` |
| Fondo de página | `--color-background` (#FFFFFF) | `bg-[var(--color-background)]` |
| Texto cuerpo | `--color-text` (#2D2926) | `text-[var(--color-text)]` |

**Botones**: usar siempre las clases globales `.btn-premium` (relleno) y `.btn-outline` (borde) definidas en [app/globals.css](app/globals.css). No recrear estilos de botón con utilidades sueltas.

**Tipografía**: aplicar las clases globales de fuente según rol del texto:
- Títulos H1–H3: se aplican automáticamente con `font-family: Playfair`
- Script/firma: `.font-script` (Allison)
- Editorial/citas: `.font-editorial` (Cormorant)
- Guías/etiquetas: `.font-guide` (Montserrat)

**Animaciones**: preferir Framer Motion para transiciones de componentes React; reservar GSAP para secuencias complejas de scroll o timeline. Usar la clase `.animate-fade-in` para entradas simples.
