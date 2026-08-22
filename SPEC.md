# Spin Wheel — Product & Feature Specification

> **Status:** Draft v1.0
> **Purpose:** This document specifies every feature of the Spin Wheel application in a
> tech-stack-agnostic way, organized into delivery phases. It is the single source of truth
> for what the product must do — not how it is implemented. Any client framework, backend
> framework, database, or hosting platform may be chosen to fulfill these requirements.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Users & Use Cases](#2-users--use-cases)
3. [Domain Model](#3-domain-model)
4. [Feature Requirements](#4-feature-requirements)
   - F4. Wheel Themes (Segment Palettes)
   - F15. Website Theme (Light / Dark)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Phased Delivery Plan](#6-phased-delivery-plan)
7. [Appendix A: Requirement Traceability Matrix](#appendix-a-requirement-traceability-matrix)
8. [Appendix B: Observed Implementation Status](#appendix-b-observed-implementation-status)
9. [Appendix C: Assumptions & Open Questions](#appendix-c-assumptions--open-questions)

---

## 1. Product Overview

Spin Wheel is a web application that lets visitors create and spin customizable "picker
wheels" to make random selections. A user picks a wheel type (custom options, yes/no,
number range, or letter set), configures its inputs, spins an animated wheel, and receives
a randomly selected result presented with a celebration effect (confetti/fireworks and
sound).

Registered users can additionally save wheel configurations, manage a personal wheel
library, and share wheels via links that load the exact saved configuration for anyone
who opens them.

### 1.1 Goals

- Provide an instantly usable random-picker tool with **no account required**.
- Support multiple wheel types for different decision scenarios.
- Offer deep visual and behavioral customization (wheel themes, site light/dark theme,
  spin physics, celebrations).
- Allow registered users to persist, revisit, and share wheel configurations.
- Be fully usable on desktop and mobile browsers.

### 1.2 Non-Goals (Out of Scope)

- Native mobile applications.
- Real-time multi-user / collaborative spinning.
- Gambling, wagering, or prize management.
- Administrative back-office dashboard (an admin flag exists in the data model but no
  admin UI is specified).

---

## 2. Users & Use Cases

### 2.1 Actors

| Actor | Description |
|---|---|
| **Guest** | Any visitor. Can use all wheel types, customize, spin, view/export history. |
| **Registered User** | A guest who created and verified an account. Additionally can save, list, load, delete, and share wheels. |
| **Shared-Link Visitor** | A guest who opens a share link and lands on a pre-configured wheel. |

### 2.2 Primary Use Cases

1. A teacher opens the letter wheel, spins to randomly pick a letter for a classroom game.
2. A user types a list of names into the custom wheel, spins to pick a winner, and
   exports the spin history.
3. A registered user configures a wheel with a theme and custom messages, saves it as
   "Friday Lunch Picker", and shares the link with colleagues.
4. A user flips a yes/no decision using the Yes/No wheel in "Yes, No or Maybe" mode and
   watches the running score.
5. A returning user logs in, opens their wheel library, and reloads a previously saved
   wheel exactly as they left it.

---

## 3. Domain Model

Tech-agnostic logical entities. Field types are logical (string, number, boolean, list,
timestamp, reference).

### 3.1 User

| Field | Type | Notes |
|---|---|---|
| id | identifier | Unique. |
| username | string (2–50) | Unique (case-insensitive). Required for local accounts. |
| email | string (5–255) | Unique (case-insensitive). Required. |
| password | string (hashed) | Optional — absent for OAuth-only accounts. |
| oauthProviderId | string | External identity (e.g., Google subject id). Optional, unique when present. |
| avatarUrl | string | Optional profile thumbnail (from OAuth profile). |
| isVerified | boolean | Default `false`. Password login requires `true`. |
| isAdmin | boolean | Default `false`. Reserved; no UI specified. |
| passwordResetToken | string | Empty when no reset is in flight. |
| passwordResetExpires | timestamp | Reset tokens are valid for 12 hours. |
| wheels | list of references to SavedWheel | The user's wheel library. |

### 3.2 SavedWheel

A persisted snapshot of a wheel's complete configuration.

| Field | Type | Notes |
|---|---|---|
| id | identifier | Unique. |
| wheelType | enum | `custom-options-wheel`, `yes-no-wheel`, `number-wheel`, `letter-wheel`. |
| customWheelName | string | Required. Display name. |
| description | string | Required. |
| popUpMessage | string | Required. Shown in the result modal (default "Congratulations!"). |
| selectedOption | string | Mode/option selected within the wheel type (e.g., "Yes, No or Maybe"). |
| customOptions | list of strings | For the custom wheel: the option labels. |
| inputNumbers | number | Repetition count of options on the wheel (1–5). |
| history | list of strings | Spin results recorded so far. |
| lowerNumber | number | Number wheel: range start. |
| highestNumber | number | Number wheel: range end. |
| interval | number | Number wheel: step between generated numbers. |
| customLetterList | string | Comma-separated custom letters (letter wheel), excluded numbers (number wheel), or serialized options (custom wheel). |
| casing | enum | `UPPERCASE` / `lowercase` (letter wheel). |
| createdAt | timestamp | Defaults to creation time. |
| spinConfig | object (see 3.3) | Required. |

### 3.3 SpinConfig

| Field | Type | Default | Notes |
|---|---|---|---|
| spinningSpeedLevel | number | 5 | Higher = faster spin-up. |
| spinningDuration | number (seconds) | 9 | Max 30. Ignored when manual stop is on. |
| manuallyStopOption | boolean | false | User clicks to stop (max ~1 min). |
| randomInitialAngleOption | boolean | false | Randomize starting rotation when inputs change. |
| mysterySpinOption | boolean | false | Render all labels as "?" until the result. |
| spinCountOption | boolean | false | Show a visible spin counter with reset. |
| confetti | boolean | true | Show celebration effect on result. |
| sound | boolean | true | Play celebration sound on result. |
| confettiType | enum | `Confetti` | `Confetti` or `Fireworks`. |
| selectedTheme | list of 4 colors | Theme #1 | Segment color palette (see F4). |

### 3.4 Supporting Entities

- **Session** — server-side session identified by a signed cookie; persists for 30 days.
- **Token** — single-purpose token (email verification or password reset) bound to a
  user; a newer token of the same purpose supersedes older ones.

### 3.5 Client-Side Entities (not necessarily persisted)

- **WheelDefinition** — static descriptor of a wheel type: `name`, `label`, `slug`
  (URL path), available modes/options, and rich-text content for SEO.
- **WheelSnapshot** — the live working state of the wheel being edited: options, mode,
  ranges, casing, history, etc.
- **Volume** — playback volume (0–100, default 50), a client-side preference.

---

## 4. Feature Requirements

Each requirement has a stable ID for traceability into phases (Section 6) and tests.

### F1. Wheel Types & Customization

The application offers **four wheel types**, each reachable via its own SEO-friendly URL
path and switchable in-app without a page reload.

#### F1.1 Custom Options Wheel (default, path `/`)

- **WT-1** The wheel ships with a default set of sample options (e.g., 5 names).
- **WT-2** The user can add a new option via a text input (button or Enter key).
  Empty/whitespace-only entries are rejected.
- **WT-3** Each option row offers: move up, move down, duplicate, delete.
- **WT-4** Option order on the wheel reflects the list order.
- **WT-5** There is no hard cap on option count, but the wheel must remain legible
  (labels auto-scale).

#### F1.2 Yes/No Wheel (path `/yes-or-no-wheel`)

- **WT-10** Two modes: "Yes or No" (2 outcomes) and "Yes, No or Maybe" (3 outcomes).
  Switching modes clears the spin history.
- **WT-11** "Input Numbers" control (1–5, default 3): each outcome label is repeated N
  times on the wheel, producing N×2 or N×3 segments.
- **WT-12** A score card displays running counts per outcome (see F7).

#### F1.3 Number Wheel (path `/random-number-wheel`)

- **WT-20** Inputs: lower bound (default 1), upper bound (default 10).
- **WT-21** Advanced inputs: interval/step (default 1) and a comma-separated exclude
  list (e.g., `1,2,3`).
- **WT-22** The generated segment list is every number from lower to upper (inclusive)
  stepping by interval, minus excluded numbers.
- **WT-23** Invalid/non-numeric entries in the exclude list are ignored. The upper bound
  is capped at 1000 segments for usability.

#### F1.4 Letter Wheel (path `/random-letter-generator`)

- **WT-30** Letter set options: Alphabet A–Z, Consonants, Vowels, Custom Letters.
- **WT-31** For the built-in sets, a casing toggle switches UPPERCASE/lowercase
  (default UPPERCASE).
- **WT-32** Custom Letters: a comma-separated free-text input; each non-empty entry
  contributes its first character as a segment.
- **WT-33** Default letter set is the alphabet (A–Z).

#### F1.5 Common Wheel Behavior

- **WT-40** Switching wheel type (via the "Switch Wheels" menu or direct URL) resets:
  history, custom letter list, metadata to defaults, repetition count (3 for yes/no,
  1 otherwise), and exits full-screen mode.
- **WT-41** A reset (refresh) control restores the current wheel type's default options
  and clears history without leaving the page.
- **WT-42** The selected wheel type's rich-text content block renders below the main
  area (see F12).

---

### F2. Spin Engine

- **SE-1** The wheel renders as a colored circle divided into equal segments — one per
  item — with readable labels, a border, separators, and a soft drop shadow.
- **SE-2** A centrally placed spin control (pointer/indicator graphic labelled "SPIN")
  starts the spin.
- **SE-3** A spin picks a uniformly random target segment and animates the wheel to land
  the pointer on it, with configurable revolutions and duration (from SpinConfig).
- **SE-4** While spinning, a tick sound plays each time the pointer passes a segment
  boundary.
- **SE-5** The spin control is inert while a spin is in progress — except when manual
  stop is enabled, in which case it reads "STOP" and halts the wheel immediately,
  resolving the result from the segment under the pointer.
- **SE-6** Attempting to spin with zero items shows an error message:
  "Please add at least one item to spin the wheel!"
- **SE-7** When the wheel comes to rest: the result is recorded (F6), the result modal
  opens (F5), and celebration effects trigger per configuration.
- **SE-8** The wheel re-renders responsively on viewport resize and whenever items,
  theme, or random-initial-angle settings change.

---

### F3. Spin Behavior Settings

Accessible from the Settings modal, "Spin Behavior" tab. All values persist into any
saved wheel.

- **SB-1** Spinning Speed Level — slider, default 5; "(Default)" marker shown when at
  the default value.
- **SB-2** Spinning Duration — slider, 1–30 seconds, default 9; "(Default)" marker.
- **SB-3** Manually Stop — checkbox (default off). When on: custom speed/duration do not
  apply; the wheel spins until stopped by the user (hard cap ~1 minute).
- **SB-4** Random Initial Angle — checkbox (default off). When on, the wheel starts at
  a randomized rotation each time inputs change.
- **SB-5** Mystery Spin — checkbox (default off). When on, every segment label displays
  as "?"; the true value is revealed only in the result.
- **SB-6** Spin Count — checkbox (default off). When on, a "Spin Count: N" readout with
  a reset button appears under the wheel, counting spins in the current session.

---

### F4. Wheel Themes (Segment Palettes)

> **Terminology:** These are **wheel themes** — color palettes applied to the wheel's
> segments only. They are unrelated to the website's light/dark *site* theme
> (see F15). A wheel theme never changes the surrounding UI chrome (page background,
> panels, navigation).

- **TH-1** The Settings modal has a "Themes" tab presenting a grid of ~59 predefined
  4-color palettes.
- **TH-2** Selecting a palette immediately recolors the wheel segments (cycling through
  the palette colors per segment index); it does not recolor the page or site chrome.
- **TH-3** Label text color auto-selects black or white per segment for contrast against
  its background color.
- **TH-4** The selected wheel theme is stored in the wheel's SpinConfig and restored
  with saved/shared wheels.

---

### F5. Result Presentation & Celebration

- **RS-1** When a spin ends, a result modal opens showing: the configured popup message
  (e.g., "Congratulations!"), the winning value in large type, and a "Selected" label.
- **RS-2** If `confetti` is enabled, a celebration effect plays for ~4 seconds:
  - `Confetti` type: falling confetti particles across the viewport, plus a celebration
    sound (when `sound` is enabled).
  - `Fireworks` type: a full-screen fireworks animation with explosion sounds.
- **RS-3** If `confetti` is disabled, no visual or audio celebration plays; the modal
  still appears.
- **RS-4** The modal can be dismissed via a close control or a Done button.
- **RS-5** In Mystery Spin mode the modal reveals the true underlying value, never "?".

---

### F6. Spin History & Export

- **HI-1** Every spin result is appended to an ordered history list for the current
  wheel session.
- **HI-2** A history modal ("All Results"), opened via a history icon beside the wheel,
  lists results in a numbered table (most recent last), scrollable for long lists.
- **HI-3** History can be exported as a plain-text file containing the wheel name,
  description, and numbered results, downloaded as `<wheel-name>.txt`.
- **HI-4** Exporting with an empty history shows an error message:
  "No History to export. Please spin the wheel first."
- **HI-5** History is cleared when: switching wheel type/mode, pressing the reset
  control, or loading a different wheel. For saved wheels, history persists with the
  wheel.

---

### F7. Score Tracking

- **SC-1** The Yes/No wheel displays a score card with one cell per outcome
  (Yes / No, or Yes / No / Maybe).
- **SC-2** Each cell shows the running count of that outcome in the current history.
- **SC-3** Counts update immediately after each spin and reset when history resets.

---

### F8. Wheel Metadata

- **MD-1** Every wheel carries: a name (auto-generated default, e.g. based on type and
  date), a description, and a popup message (default "Congratulations!").
- **MD-2** A "Modify" modal (pencil/text icon in the Customize panel) edits all three
  fields, with Save and Reset actions.
- **MD-3** For guests, saving metadata applies to the live session only and prompts
  login if persistence is attempted (see F10).
- **MD-4** Metadata is included when a wheel is saved and restored when it is loaded.

---

### F9. Accounts & Authentication

#### F9.1 Registration & Verification

- **AU-1** A guest can register with username, email, and password. Username and email
  must each be unique (case-insensitive); clear errors are returned on conflicts
  ("Username already taken...", "Email already registered...").
- **AU-2** On registration, a verification email containing a confirmation link is sent.
  The account is created with `isVerified = false`.
- **AU-3** Opening the confirmation link marks the account verified and invites login.
  Invalid/expired/unknown tokens produce a clear error.
- **AU-4** A guest can request the verification email be re-sent ("send confirmation").
- **AU-5** A guest can cancel a pending registration, which deletes the unverified
  account for that email.
- **AU-6** If the verification email cannot be sent, the registration is rolled back
  and a service-unavailable error is shown.

#### F9.2 Login / Logout

- **AU-10** Login with email/username + password establishes a server-side session
  (30-day cookie).
- **AU-11** Login fails with distinct errors for: missing credentials, invalid
  credentials, and unverified account ("Your account has not been verified...").
- **AU-12** Logout destroys the session.
- **AU-13** The application restores the session on page load (silent re-auth) with a
  loading indicator.

#### F9.3 OAuth

- **AU-20** "Login with Google" redirects through the provider's consent flow and, on
  success, establishes a session (creating the account on first use, capturing the
  profile thumbnail).
- **AU-21** A failed OAuth flow redirects back to the home page with an error
  notification ("Google login failed").
- **AU-22** The UI also exposes a Facebook login button (stub; full support is a future
  enhancement — see Appendix C).

#### F9.4 Password Reset

- **AU-30** "Forgot password" accepts an email and, if the account exists, sends a
  reset link containing a single-use token valid for 12 hours.
- **AU-31** The reset page (token in URL) accepts a new password; it rejects invalid,
  expired, superseded, or mismatched tokens with clear messages.
- **AU-32** On successful reset, a confirmation email is sent.

#### F9.5 Profile & Route Guards

- **AU-40** An authenticated user can view a profile page showing their username.
- **AU-41** A logout page/action ends the session and returns the user to the home page.
- **AU-42** The auth modal (login/signup toggle) is reachable from the navigation menu;
  authenticated state replaces "Login/Signup" affordances with account affordances.
- **AU-43** Guest attempts to save or share a wheel are intercepted with
  "Please login to save changes".

---

### F10. Saved Wheels (Persistence)

- **WP-1** An authenticated user can save the current wheel configuration as a
  SavedWheel, including: wheel type, options/mode, ranges, casing, history, metadata,
  and full SpinConfig (settings, theme, celebration options).
- **WP-2** Saving an existing wheel (by id) updates it in place; saving without an id
  creates a new wheel and links it to the user's library.
- **WP-3** The user's wheel library is listed in a "Your Wheels" modal, showing each
  saved wheel's name and type; opening one loads the full configuration and navigates
  to the correct wheel-type URL.
- **WP-4** Loading a saved wheel restores every element of its configuration
  (options, settings, theme, metadata, history).
- **WP-5** A user can delete a wheel from their library (delete is exposed by the API;
  see Appendix B for UI status).
- **WP-6** Unauthenticated guests are prompted to log in when attempting to save.

---

### F11. Sharing

- **SH-1** A "Share" control (navbar) opens a share popup with a read-only link field
  and a "Generate Link" action.
- **SH-2** If the current wheel has no saved id, generating a link saves the wheel
  first (requiring login) and then builds the link.
- **SH-3** The generated link is of the form `<base-url><wheel-slug>?id=<wheel-id>` and
  is copied to the clipboard on request.
- **SH-4** Opening a share link loads the wheel by id into the full application state
  (as in WP-4) with a loading indicator.
- **SH-5** Unknown/invalid wheel ids on a share link produce an error notification and
  fall back to the default wheel.
- **SH-6** While a link exists for the session, regenerating is skipped (existing link
  is reused until the wheel changes).

---

### F12. Content Pages & SEO

- **CP-1** Each wheel type has a dedicated, crawlable URL path with an SEO title
  (e.g., "Yes or No Picker Wheel") and a long-form rich-text content section rendered
  below the wheel describing the wheel, its purpose, and usage.
- **CP-2** A footer with brand, copyright, and links to the following pages:
  About Us, Contact Us, Privacy Policy, Terms & Conditions, and Site Map.
- **CP-3** About Us, Contact Us, Privacy Policy, and Terms & Conditions are static
  informational pages reachable from the footer.
- **CP-4** An XML sitemap and a robots.txt are served to search engines.
- **CP-5** Routes are share-friendly: unknown paths redirect to the home page.

---

### F13. Layout, Navigation & Responsive Behavior

- **UX-1** A sticky navigation bar shows the brand (logo + "Spin Wheel") and, on the
  right: Login/Signup, Select Wheel, and Setting icons.
- **UX-2** The navbar also exposes "Switch Wheels" (pick a wheel type) and "Share"
  popup triggers; on mobile these collapse into a hamburger menu.
- **UX-3** The "Select Wheel" menu item opens the user's wheel library ("Your Wheels").
- **UX-4** The main page layout has the wheel on the left and a "Customize Wheel" panel
  on the right (stacked on small screens). The yes/no wheel additionally shows its
  score card.
- **UX-5** The Customize panel header offers: full-screen toggle, reset (refresh), and
  modify (text) controls.
- **UX-6** Full-screen mode expands the wheel to fill the viewport with a fade
  transition; toggling returns to the standard layout.
- **UX-7** A volume controller is available near the wheel (hidden in full-screen).
- **UX-8** Layout is responsive from small phones (hamburger menu, stacked panels,
  scaled text/icons) up to large desktops.
- **UX-9** A loading spinner is shown during initial session restore and while a
  shared/saved wheel loads.

---

### F14. Audio & Volume Control

- **AU-50** Tick sound plays per segment while the wheel spins (see SE-4).
- **AU-51** A celebration sound plays on results when `sound` is enabled (see RS-2).
- **AU-52** A volume slider (0–100, default 50) controls playback volume of tick and
  celebration sounds.
- **AU-53** Fireworks celebration uses explosion sound effects (fires even when the
  global `confetti` sound setting is off, per current behavior).

---

### F15. Website Theme (Light / Dark)

> **Terminology:** The **website theme** is the whole-application color scheme (light or
> dark) applied to the UI chrome — page background, panels, modals, navigation, footer,
> and text. It is independent of the **wheel theme** (F4), which only colors wheel
> segments.

- **WT-50** The website supports two site themes: **Light** (default) and **Dark**.
- **WT-51** A theme toggle control is available in the navigation (or equivalent global
  location) to switch between light and dark; the choice takes effect immediately
  across the entire application.
- **WT-52** The active site theme is persisted as a user preference so it is restored on
  subsequent visits; the default is Light until the user chooses otherwise.
- **WT-53** All UI surfaces (navigation, panels, modals, forms, toasts, footer, content
  pages, wheel controls) are legible and correctly styled in both themes.
- **WT-54** The site theme never alters the wheel's segment colors — wheel themes (F4)
  render identically regardless of site theme.
- **WT-55** The site theme preference is independent of any saved wheel configuration
  (it is not part of a wheel's SpinConfig or shared with shared links).

---

## 5. Non-Functional Requirements

- **NF-1 Performance** — The page loads quickly; wheel spins animate smoothly (60 fps
  target) on mid-range mobile and desktop devices; shared wheels load within seconds.
- **NF-2 Security** — Passwords are stored only as salted hashes; session cookies are
  signed; database queries are protected against injection/sanitization; API input is
  validated before processing; secrets (email provider key, session key, OAuth keys)
  are never exposed to the client and are supplied via environment configuration.
- **NF-3 Reliability / Resilience** — Email-sending failures degrade gracefully with
  informative errors and no partial data corruption (registrations roll back).
- **NF-4 Scalability** — The application can serve many concurrent guests; rate
  limiting is available (currently disabled by default) to protect auth endpoints.
- **NF-5 Observability** — Structured server logging captures errors; a health check
  endpoint exists.
- **NF-6 Accessibility** — Controls are keyboard-operable and labeled; text/icons have
  sufficient contrast (per segment label auto-contrast in TH-3).
- **NF-7 Browser Support** — Latest versions of major evergreen browsers (Chrome,
  Firefox, Safari, Edge), desktop and mobile.
- **NF-8 Deployment** — The application ships as containerized services (client,
  server, database) with separate development and production configurations; the
  production client serves static assets via a reverse proxy (e.g., nginx).
- **NF-9 Testing** — An end-to-end smoke test verifies the home page renders; the test
  suite grows with each phase.
- **NF-10 CI/CD** — Continuous integration runs static analysis and automated checks;
  deployment pipelines exist for client and server to their hosting targets.

---

## 6. Phased Delivery Plan

Each phase is independently deliverable and ends in a shippable state. Phases may be
worked sequentially; dependencies between phases are listed. Every phase includes a
Definition of Done (DoD) with acceptance criteria tied to the requirement IDs above.

---

### Phase 0 — Foundations

**Goal:** Establish the project skeleton, tooling, design system, and deployment
baseline so later phases can land cleanly.

**Scope:**

- Project scaffolding for client, server, and tests; local development and production
  container setups.
- Shared UI primitives: buttons, inputs, modals, cards, tabs, checkboxes, sliders,
  toasts, spinner — tech-agnostic behaviors specified here.
- Design tokens supporting both the **website theme** (light/dark — F15) and the
  **wheel theme** palette system (F4); UI primitives are styled from these tokens.
- Website light/dark theme toggle with persisted preference (F15).
- CI pipeline (static analysis + automated tests) and container-based deployments.
- Health check endpoint and structured logging (NF-5).

**Requirements:** NF-2 (foundations), NF-5, NF-8, NF-9, NF-10; UX-9 (loading states);
WT-50..WT-55.

**Definition of Done:**

- A fresh clone boots the full stack locally with one command.
- A smoke E2E test passes (home page renders).
- The site theme toggles between light and dark across all UI surfaces, persists
  across visits, and does not affect wheel segment colors.
- CI runs on every push; client and server deploy automatically to staging.
- Logging and health check are observable.

---

### Phase 1 — Core Spin MVP

**Goal:** Deliver a usable custom-options wheel with spinning, result, and history —
fully anonymous, no accounts.

**Scope:**

- Custom Options Wheel controls (F1.1): default options, add, reorder, duplicate,
  delete.
- Spin engine (F2) for the custom wheel: render, random target, animation, tick sound.
- Result modal with popup message and default celebration (F5, minimal).
- Session history + history modal + export (F6).
- Wheel metadata defaults and reset control (F8 minimal, MD-1/MD-2/MD-4).
- Wheel-type switching scaffold and route mapping (WT-40, WT-41, WT-42 minimal).

**Requirements:** WT-1..WT-5, WT-40, WT-41, SE-1..SE-8, RS-1, RS-4, HI-1..HI-5,
MD-1, MD-2, MD-4, UX-1, UX-4, UX-5, UX-8.

**Definition of Done:**

- A guest can add/remove/reorder/duplicate options, spin, see a random result in a
  modal, and view/export history.
- Spinning with zero items shows the required error.
- Home page renders the wheel on desktop and mobile.

---

### Phase 2 — Wheel Type Suite

**Goal:** Add the remaining three wheel types and their specific controls.

**Scope:**

- Yes/No wheel: modes, input-number repetition, score card (F1.2, F7).
- Number wheel: bounds, interval, exclude list, capped segment generation (F1.3).
- Letter wheel: alphabet/consonant/vowel/custom sets, casing toggle (F1.4).
- Full switching behavior including resets per wheel type (WT-40, WT-41) and SEO
  content blocks per wheel (CP-1).

**Requirements:** WT-10..WT-12, WT-20..WT-23, WT-30..WT-33, WT-42, SC-1..SC-3,
CP-1.

**Definition of Done:**

- Each of the four wheel types is reachable via its URL and renders correct segments
  for edge cases (excludes, intervals, custom letters, casing).
- Yes/No score card tracks counts correctly and resets with history.
- Each wheel type's content section renders below the wheel.

---

### Phase 3 — Customization & Experience

**Goal:** Deliver wheel themes and full spin-behavior/celebration configuration.

**Scope:**

- Wheel themes grid + live recolor + label auto-contrast (F4).
- Spin behavior settings: speed, duration, manual stop, random angle, mystery spin,
  spin count (F3).
- Celebration options: confetti on/off, confetti vs fireworks, sound on/off; result
  modal celebration behaviors (F5 full).
- Volume controller (F14).
- Full-screen mode (UX-6).

**Requirements:** TH-1..TH-4, SB-1..SB-6, RS-2, RS-3, RS-5, AU-50..AU-53, UX-6, UX-7.

**Definition of Done:**

- Changing a wheel theme immediately recolors segments; text remains readable.
- Each spin-behavior toggle demonstrably changes wheel behavior (e.g., mystery labels
  show "?", manual stop halts mid-spin, spin counter increments/resets).
- Confetti and fireworks each trigger with/without sound per config.
- Volume slider changes tick and celebration volume.

---

### Phase 4 — Accounts & Authentication

**Goal:** Introduce accounts with email verification, OAuth, password reset, and
session management.

**Scope:**

- Registration + verification emails + resend + cancel (F9.1).
- Login/logout + session restore (F9.2).
- Google OAuth (F9.3; Facebook remains a stub).
- Password reset flow (F9.4).
- Profile page, route guards, auth modal toggle, guest save interception (F9.5).
- Email provider integration and graceful failure handling (AU-6).

**Requirements:** AU-1..AU-6, AU-10..AU-13, AU-20..AU-22, AU-30..AU-32, AU-40..AU-43,
NF-2 (auth), NF-3.

**Definition of Done:**

- Full registration→verification→login journey passes E2E (with test email sink).
- Password reset rejects expired/tampered tokens; success sends confirmation email.
- Google login establishes a session and creates account on first use.
- Guests are blocked with the required message when attempting to save/share.
- Logout invalidates the session.

---

### Phase 5 — Wheel Persistence & Library

**Goal:** Let authenticated users save, list, load, and delete wheels.

**Scope:**

- Save (create/update) current wheel configuration (F10 WP-1, WP-2).
- "Your Wheels" library modal (WP-3), full restore on load (WP-4).
- Delete wheel (WP-5, backend; UI if not already present — see Appendix B).
- Guest interception on save (WP-6).

**Requirements:** WP-1..WP-6, MD-3.

**Definition of Done:**

- A logged-in user saves a fully-customized wheel, sees it in the library, reloads it
  with every setting intact, and can delete it.
- Saving an edited wheel updates rather than duplicates.
- A logged-out user is prompted to log in on save.

---

### Phase 6 — Sharing

**Goal:** Enable share links that reproduce a saved wheel for anyone.

**Scope:**

- Share popup with generate + copy (F11 SH-1, SH-2, SH-3).
- Load wheel from `?id=` share link with loading indicator (SH-4).
- Error handling for invalid ids (SH-5); link reuse within a session (SH-6).

**Requirements:** SH-1..SH-6.

**Definition of Done:**

- A guest opens a shared link (in an incognito session) and sees the exact saved wheel,
  then can spin it without an account.
- Copy-to-clipboard works; invalid ids show an error and fall back gracefully.

---

### Phase 7 — Content, SEO & Polish

**Goal:** Complete public pages, search-engine friendliness, and cross-cutting polish.

**Scope:**

- Footer + About/Contact/Privacy/Terms pages (CP-2, CP-3).
- Sitemap.xml and robots.txt (CP-4).
- Redirect/404 handling (CP-5).
- Accessibility pass, responsive refinement, loading/error states (NF-6, UX-8, UX-9).

**Requirements:** CP-2..CP-5, NF-6, UX-8, UX-9.

**Definition of Done:**

- All public pages reachable from the footer and render on mobile/desktop.
- Sitemap and robots.txt are served; unknown routes redirect home.
- A basic accessibility audit (keyboard nav + contrast) passes.

---

### Phase 8 — Hardening & Launch

**Goal:** Production readiness: security, rate limiting, scale, and full test coverage.

**Scope:**

- Enable rate limiting on auth endpoints (NF-4).
- Security audit: injection/sanitization, session handling, secrets hygiene (NF-2).
- E2E coverage for all phases (NF-9).
- Performance pass on spin animation and page load (NF-1).
- Production deployment verification across client/server/db (NF-8, NF-10).

**Requirements:** NF-1..NF-4, NF-7, NF-9, NF-10.

**Definition of Done:**

- Rate limiting active; security checks pass.
- Full E2E suite green in CI.
- Production deployment smoke-tested end to end.
- Admin flag remains reserved but documented for future work.

---

## Appendix A: Requirement Traceability Matrix

| Requirement IDs | Primary Phase | Feature |
|---|---|---|
| WT-1..WT-5 | 1 | Custom Options Wheel |
| WT-10..WT-12, SC-1..SC-3 | 2 | Yes/No Wheel + Score |
| WT-20..WT-23 | 2 | Number Wheel |
| WT-30..WT-33 | 2 | Letter Wheel |
| WT-40..WT-42 | 1 / 2 | Common Wheel Behavior |
| SE-1..SE-8 | 1 | Spin Engine |
| SB-1..SB-6 | 3 | Spin Behavior Settings |
| TH-1..TH-4 | 3 | Wheel Themes (Segment Palettes) |
| WT-50..WT-55 | 0 | Website Theme (Light / Dark) |
| RS-1..RS-5 | 1 / 3 | Result Presentation & Celebration |
| HI-1..HI-5 | 1 | Spin History & Export |
| MD-1..MD-4 | 1 / 5 | Wheel Metadata |
| AU-1..AU-6, AU-10..AU-13, AU-20..AU-22, AU-30..AU-32, AU-40..AU-43 | 4 | Accounts & Authentication |
| AU-50..AU-53 | 3 | Audio & Volume |
| WP-1..WP-6 | 5 | Saved Wheels |
| SH-1..SH-6 | 6 | Sharing |
| CP-1..CP-5 | 2 / 7 | Content Pages & SEO |
| UX-1..UX-9 | 1 / 3 / 7 | Layout, Navigation & Responsive |
| NF-1..NF-10 | 0 / 8 | Non-Functional |

---

## Appendix B: Observed Implementation Status

Status derived from a review of the codebase at v1. Phases treat the *specified* target
as the source of truth; where a feature is already built, the phase is reduced to
verification and gap-closure.

| Area | Observed Status |
|---|---|
| Four wheel types + controls | Implemented (custom, yes/no, number, letter) |
| Spin engine, tick sound, spin button | Implemented |
| Result modal, confetti, fireworks, celebration sound | Implemented |
| Spin behavior settings (all six) | Implemented |
| Wheel themes (59 segment palettes, auto-contrast) | Implemented |
| Website theme (light/dark) | Not implemented — new in v2 |
| History modal + export | Implemented |
| Yes/No score card | Implemented |
| Wheel metadata + modify modal | Implemented |
| Full-screen mode | Implemented (toggle present; desktop-only affordance) |
| Volume controller | Implemented |
| Registration, verification, resend, cancel | Implemented |
| Login / logout / session restore | Implemented |
| Google OAuth | Implemented |
| Facebook login | Stub only (button; not functional) |
| Password reset | Implemented |
| Profile / logout pages, route guards | Implemented (protected routes present) |
| Save wheel (create/update) | Implemented |
| Your Wheels library modal + load | Implemented |
| Delete wheel | Backend route implemented; **no UI affordance found** |
| Share link (save→generate→copy→load) | Implemented |
| Share-link regenerate guard | Implemented |
| Static pages (About, Contact, Privacy, Terms) | Implemented |
| Sitemap / robots.txt | Implemented |
| Health endpoint | Present in code; route commented out in app |
| Rate limiting | Code present but disabled by default |
| E2E smoke test | Implemented (homepage renders) |
| Docker dev + prod, CI/CD workflows | Implemented |
| Fullscreen toggle title | Marked "feature currently unavailable" in tooltip |

---

## Appendix C: Assumptions & Open Questions

**Assumptions**

1. The four wheel types, their slugs, and default values specified here match the
   intended product (based on current code).
2. History is session-scoped for guests and persisted for saved wheels; no requirement
   for cross-device guest history.
3. Wheel theme count (~59 segment palettes) is fixed for v2; adding user-defined
   palettes is out of scope. The website theme is limited to Light and Dark.
4. Email delivery uses a third-party provider keyed by environment config.
5. "Version 1" (v1 tag) represents the current shipped baseline; v2 improves and
   completes the features described here.

**Open Questions**

1. Should the Facebook login be implemented in v2 or removed from the UI?
2. Is a delete-wheel UI control required in v2 (API exists)?
3. Should the full-screen toggle be formally enabled (currently marked unavailable)?
4. Should the health endpoint and rate limiting be enabled for production in v2?
5. Is the admin role intended to surface a back-office UI in any future phase?

<!-- END -->
