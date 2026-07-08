# UI Context

## Visual Direction

The interface should feel like a serious banking operations cockpit: quiet, dense, readable, and trustworthy. It should avoid marketing-style hero layouts, decorative gradients, and generic AI chat visual language.

## Color Tokens

| Token | Hex | Usage |
| --- | --- | --- |
| `ink` | `#172033` | Primary text and primary buttons |
| `canvas` | `#f6f8fb` | App background |
| `line` | `#d9e2ec` | Borders and dividers |
| `muted` | `#64748b` | Secondary text |
| `success` | `#118c5a` | Approved, ready, safe |
| `warning` | `#b7791f` | Needs review |
| `danger` | `#c2410c` | Blocked, risky, failed |
| `info` | Blue scale | Informational badges and links |

## Typography

- Use system sans-serif fonts.
- Page headings are 30-36px depending on viewport.
- Card headings are compact and functional.
- Tables use small readable text with strong hierarchy.
- Avoid viewport-scaled font sizing.

## Layout Patterns

- Persistent left sidebar on desktop.
- Sticky top context bar with operating mode and readiness signals.
- Full-width page layouts with constrained spacing.
- Cards are for individual operational panels only.
- Tables are preferred for repeated operational records.
- Timelines are preferred for run and audit events.

## Component Rules

- Use rounded-md cards, buttons, badges, and panels.
- Use badges for status, risk, approval, and mode.
- Use metric tiles for portfolio and run summaries.
- Use lucide icons in shell/navigation.
- Avoid nested cards and decorative UI.
