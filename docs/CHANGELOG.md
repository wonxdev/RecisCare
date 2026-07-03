# Changelog
All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
- Offline-first `localStorage` persistence layer (`app.js`).
- PWA manifest for installable/offline experience.