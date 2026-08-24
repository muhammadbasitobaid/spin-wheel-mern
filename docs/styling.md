# Styling Guide — v1 to v2 Tailwind Mapping

This doc maps the v1 UI styling to the v2 Tailwind setup so agents can rebuild screens with the same visual output.

## Color tokens

| v1 class / value | v2 token | Notes |
|---|---|---|
| `text-black` (`#3B3B3B`) | `text-foreground` | Body/headings |
| `text-gray` (`#848484`) | `text-muted-foreground` | Secondary text, notes |
| `text-light-gray` (`#D6D6D6`) | `text-v1-light-gray` or `border` | Disabled / borders |
| `bg-blue` (`#0089D6`) | `bg-primary` | Primary action buttons |
| `text-white` | `text-primary-foreground` | Text on primary buttons |
| `bg-white` | `bg-background` | Panels/cards in light mode |
| `bg-slate` (`#F8F8F8`) | `bg-secondary` | Counter backgrounds, subtle surfaces |
| `blue-light` (`#DFF4FF`) | `bg-accent` | Light accent surface |
| `gray-alpha` (`rgba(217,217,217,0.17)`) | `bg-v1-alpha` | Rarely used |
| Tailwind `gray-100` | `bg-secondary` / `bg-muted` | Wheels popup, list hover |
| Tailwind `gray-200` | `bg-muted` | Disabled inputs, range track |
| Tailwind `gray-300` | `border` | Table borders, subtle dividers |
| Tailwind `gray-500` | `text-muted-foreground` | Subdued meta text |
| Tailwind `gray-700` | `text-foreground` | Footer text |
| Tailwind `gray-800` | `text-foreground` | Auth modal headings |

## Border radius

| v1 class | value | v2 class |
|---|---|---|
| `rounded-custom-none` | `0px` | `rounded-v1-none` |
| `rounded-custom-sm` | `8px` | `rounded-v1-sm` |
| `rounded-custom` | `20px` | `rounded-v1` |
| `rounded-custom-lg` | `89px` | `rounded-v1-lg` |
| `rounded-full` | `9999px` | `rounded-full` |

## Shadows

| v1 class | value | v2 class |
|---|---|---|
| `shadow-3xl` | `0px 0px 89px 0px rgba(0,0,0,0.11)` | `shadow-v1-3xl` |
| `drop-shadow-4xl` | `0px 48px 100px rgba(17,12,46,0.15)` | `drop-shadow-v1-4xl` |

## Typography

- Font: `Poppins` (loaded in `app/globals.css`); apply via `font-sans`.
- Heading sizes from v1:
  - Page title: `text-4xl font-medium`
  - Section heading: `text-2xl font-semibold`
  - Modal title: `text-2xl font-medium`
  - Result value: `text-4xl md:text-6xl lg:text-8xl xl:text-9xl leading-none`
  - Score value: `text-5xl`
  - Score label: `text-2xl text-muted-foreground`

## Component patterns

### Button (primary)

```tsx
<Button className="rounded-v1-sm font-medium">
  Label
</Button>
```

### Button (inverted / outline)

```tsx
<Button variant="outline" className="rounded-v1-sm border-foreground text-foreground font-medium">
  Label
</Button>
```

### Card

```tsx
<Card className="rounded-v1 shadow-v1-3xl">
```

### Modal / Dialog

```tsx
<DialogContent className="rounded-v1 lg:rounded-v1-lg shadow-v1-3xl w-[90%] md:w-[50%] max-w-[900px]">
```

### Input

```tsx
<Input className="rounded-v1-sm border-v1-light-gray" />
```

### Theme note

Site theme (light/dark) only affects UI chrome. Wheel segment colors come from `SpinConfig.wheelThemeId` and are independent.
