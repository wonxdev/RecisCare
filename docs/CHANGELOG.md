# Changelog
All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.0.0] — Dark Design System Redesign
### Changed
- Rebuilt `assets/css/style.css` as a token-driven, dark-only design system (surfaces, text, brand, status, radius, elevation, and motion tokens) matching the Assignly portfolio style.
- Dark mode is now the default and only theme; the light/dark toggle and persisted theme preference were removed per the project design guidelines.
- Redesigned the login and register pages as centered auth cards with the brand mark, a single emphasized primary action, and smooth focus states.
- Added a consistent sticky top navigation bar (brand, active user, logout) to the student and teacher dashboards.
- Standardized all components: buttons (primary/secondary/ghost/success/danger), cards, list rows, stat tiles, badges, form fields, toolbar, empty states, and the file dropzone.
- Replaced `alert()`/`confirm()` with reusable toast notifications and an animated confirm modal.
- Extracted inline page scripts into `assets/js/pages/` (`login.js`, `student.js`, `teacher.js`); `app.js` now holds shared UI utilities only.
- Seed attendance dates now land on each student's scheduled duty day, so the demo history reflects the real workflow.
- Updated the PWA manifest theme colors to match the dark theme.

### Fixed
- Root `index.html` loaded `../assets/js/app.js` (one directory above the repo root), so the demo banner never rendered on the login page.
- Redirects now resolve from the repo root regardless of the current page location.
- `DemoStore.users.get()` crashed on deleted users (`JSON.parse("undefined")`), breaking the class-leader panel when attendance referenced a removed account.
- Future duty dates are now labeled "Terjadwal" instead of counting as missed warnings.
- Deleting a user now asks for confirmation; editing a user shows a cancel action and correct button label.
- CSV export now escapes values containing commas, quotes, or newlines.
- All user-provided values are HTML-escaped before rendering.

## [2.0.0] — Portfolio Standard Refactor
### Changed
- Split the single `assets/js/app.js` data/auth module into two focused modules:
  - `demo/demo-data.js` — fictional seed data (users, schedule, attendance)
  - `assets/js/demo-store.js` — `DemoStore` API (`getAll`, `get`, `create`, `update`, `delete`) plus auth/session/theme helpers
- Renamed the global data API from `database` to `DemoStore` across all pages, matching the Assignly / RecisCam portfolio convention.
- Rewrote `README.md` to follow the standard portfolio structure: Overview, Portfolio Demo Notice, Features, Tech Stack, Demo Mode, Folder Structure, How to Run, Limitations, Future Improvements, Project Status, License.
- Moved `LICENSE` to the repo root (previously nested under `docs/`).

### Fixed
- Root `index.html` referenced assets via `../assets/...`, which resolved one directory above the repo root. Paths corrected to `assets/...` at root and `../assets/...` from `pages/`.
- Teacher dashboard (`pages/teacher.html`): the rendered attendance list HTML was built but never inserted into the `#list` container, so submissions never appeared. Now correctly assigned to the DOM.

### Added
- Portfolio Demo badge on the login screen.
- "Reset Data Demo" action to wipe and reseed all local data on demand.
- `DEMO_ACCOUNTS.md` walkthrough covering all five roles end-to-end.

### Removed
- `ARCHITECTURE.md`, `CONTRIBUTING.md`, `GETTING_STARTED.md`, `PROJECT_STRUCTURE.md`, and the duplicate `docs/` folder (`docs/README.md`, `docs/LICENSE`, `docs/CHANGELOG.md`) — consolidated into a single root-level `README.md`, `LICENSE`, and this file.
- `.git` history from the packaged demo (repo is redistributed as a clean static snapshot).

### Notes
- No UI, workflow, or feature changes. This release is infrastructure- and documentation-only, converting the project into a clean, frontend-only portfolio demo.

## [1.0.0] — Initial Release
### Added
- Role-based piket (school duty) attendance system: Student, Teacher, Class Leader, Administrator.
- Photo-evidence submission workflow with pending / accepted / rejected review states.
- CSV export of attendance records.
- Dark mode with persisted preference.
- Supabase for authentication, database, and photo storage.
- PWA manifest for installable/offline experience.