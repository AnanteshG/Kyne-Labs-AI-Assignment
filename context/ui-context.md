# UI Context

## Visual Direction

The interface should feel like a serious banking operations cockpit with a Tremor-inspired analytics style: dark mode by default, crisp cards, clear metric hierarchy, progress bars, Apex-style animated trends, rounded bar charts, flow ribbons, workflow canvases, confident blue accents, and light/dark operating modes.

## Color Tokens

| Token | Hex | Usage |
| --- | --- | --- |
| `ink` | `#172033` | Primary text and primary buttons |
| `canvas` | `#f6f8fb` | App background |
| `line` | `#d9e2ec` | Borders and dividers |
| `muted` | `#64748b` | Secondary text |
| `cobalt` | `#2457c5` | Primary informational accents |
| `forest` | `#0f766e` | Operational progress accents |
| `plum` | `#7c3aed` | Rare AI/coworker accent |
| `clay` | `#b45309` | Operational exception accent |
| `success` | `#118c5a` | Approved, ready, safe |
| `warning` | `#b7791f` | Needs review |
| `danger` | `#c2410c` | Blocked, risky, failed |
| `info` | Blue scale | Informational badges and links |
| `electric` | `#38bdf8` | Dark-mode primary highlight and glow |

## Typography

- Use an Aptos-first system sans-serif stack.
- Use a tighter Segoe UI Variable/Aptos stack for navigation chips and shell controls.
- Page headings are 30-36px depending on viewport.
- Card headings are compact and functional.
- Tables use small readable text with strong hierarchy.
- Avoid viewport-scaled font sizing.

## Layout Patterns

- Persistent left sidebar on desktop with hamburger-style collapse to an icon rail.
- Hamburger drawer navigation on mobile.
- Sticky single-line top context bar with the current section, readable readiness summaries, channel risk, and user profile.
- Floating Ask AI button is available across authenticated app pages.
- First-run onboarding uses a short Joyride tour over navigation, top-bar context, and Ask AI.
- Dark mode is the default initial experience; explicit user theme changes are persisted.
- Full-width page layouts with constrained spacing.
- Cards are for individual operational panels only.
- Tables are preferred for repeated operational records.
- Tables become card lists on mobile.
- Timelines are preferred for run and audit events.

## Component Rules

- Use rounded-md cards, buttons, badges, and panels.
- Use badges for status, risk, approval, and mode.
- Use metric tiles for portfolio and run summaries.
- Use ApexCharts-powered compact sparkline charts, smooth gradient area trends, rounded bar charts, pulse timelines, flow ribbons, and donut meters where they clarify operational movement.
- Use React Flow for the workflow and agents canvas; nodes should represent regulated Banking Hand modules, not a generic automation playground.
- Keep animations subtle and operational: draw charts, pulse live events, and reveal meters without distracting from review work.
- Use lucide icons in shell/navigation.
- Avoid nested cards and decorative UI.
