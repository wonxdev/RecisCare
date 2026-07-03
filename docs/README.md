# RecisCare — Sistem Piket Sekolah

🧪 **Portfolio Demo** — a frontend-only, offline-first rebuild of a school duty (piket) attendance system. All data lives in your browser's `localStorage`; there is no backend, no server, and no real user data involved.

## Overview

RecisCare is a role-based web app for managing student "piket" (duty) attendance at a school: students submit photo evidence of completed duties, teachers review and approve or reject submissions, class leaders monitor their class's status, and administrators manage accounts across the system.

This version has been refactored into a pure static site so it can be explored instantly, hosted for free on GitHub Pages, and read end-to-end as a self-contained portfolio piece.

## Portfolio Demo Notice

- This is a **demonstration build**, not a production system.
- All data is fictional and generated locally — no real students, teachers, or schools are represented.
- There is no backend: everything runs client-side and persists via `localStorage` in your browser only.
- Login is simulated. Passwords are plain demo strings, visible in [`DEMO_ACCOUNTS.md`](DEMO_ACCOUNTS.md), and exist purely to let you explore each role.
- Data you create (new users, submissions, reviews) stays on your device and can be wiped anytime with the **Reset Data Demo** option.

## Features

**Student**
- Upload photo evidence of completed duty with automatic timestamps
- View personal duty schedule and submission history
- Track submission status (pending / accepted / rejected) with teacher feedback

**Teacher**
- Review pending submissions and accept or reject with a feedback note
- Filter submissions by day
- Export all attendance records to CSV

**Class Leader**
- View today's duty schedule for their class
- See a live count of submissions for their class

**Administrator**
- Full user management (create, edit, delete accounts)
- Assign roles and classes
- Access all teacher-level review and reporting tools

**Shared**
- Dark mode with persisted preference
- Responsive layout for mobile and desktop
- One-click demo login per role — no registration required

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript** — no frameworks, no build step
- **`localStorage`** — acts as the entire persistence layer via a small `DemoStore` module
- **Static hosting** — deployable as-is to GitHub Pages or any static file host

## Demo Mode

Instead of a real backend, RecisCare uses `DemoStore`, a small JavaScript module ([`assets/js/demo-store.js`](assets/js/demo-store.js)) that mimics the shape of a typical backend client (`getAll`, `get`, `create`, `update`, `delete`) but reads and writes to `localStorage`.

- Seed data — fictional users, schedules, and attendance records — lives in [`demo/demo-data.js`](demo/demo-data.js) and loads automatically the first time the app runs.
- All UI code talks to `DemoStore` only; nothing calls an external API.
- Data persists across page reloads in the same browser, and resets cleanly via the **Reset Data Demo** link on the login page.

See [`DEMO_ACCOUNTS.md`](DEMO_ACCOUNTS.md) for ready-to-use demo accounts and a suggested walkthrough.

## Folder Structure

```
RecisCare/
├── index.html                 # Login / role-selection screen (entry point)
├── pages/
│   ├── student.html           # Student dashboard
│   ├── teacher.html           # Teacher / class leader / admin dashboard
│   └── register.html          # Registration placeholder (disabled in demo)
├── assets/
│   ├── css/
│   │   └── style.css          # Shared styling, theme variables, dark mode
│   ├── js/
│   │   └── demo-store.js      # LocalStorage data layer + auth/session helpers
│   └── logo.png
├── demo/
│   └── demo-data.js           # Fictional seed data (users, schedule, attendance)
├── public/
│   └── manifest.json          # PWA manifest
├── DEMO_ACCOUNTS.md            # Demo credentials and walkthrough
├── README.md
└── LICENSE
```

## How to Run

No installation, build tools, or dependencies required.

1. Download or clone this repository.
2. Open `index.html` directly in a modern browser, **or** serve the folder with any static file server (e.g. `npx serve .`).
3. Pick a role on the login screen and click **Lanjutkan** to enter the demo.

To deploy on GitHub Pages: push the repo and enable Pages on the `main` branch, root folder — `index.html` at the repo root is already the entry point.

## Limitations

- No real authentication or authorization — this is a client-side simulation only.
- No encryption; demo passwords are stored in plain text in localStorage.
- Uploaded "photo evidence" only stores the file name, not the actual image, since there's no server or storage bucket to hold it.
- Data is local to a single browser and device — nothing syncs between users or sessions.
- Not intended, and not hardened, for production or real institutional use.

## Future Improvements

- Optional real backend (e.g. Supabase/Firebase) as a swap-in replacement for `DemoStore`, keeping the same method signatures.
- Actual image upload/preview persistence rather than filename-only storage.
- Notifications for students when a submission is reviewed.
- Multi-language support (currently Indonesian-first UI).

## Project Status

Feature-complete as a portfolio demo. No further backend work is planned; future changes would focus on UI polish or optional enhancements listed above.

## License

MIT License — see [LICENSE](LICENSE) for details.

Copyright (c) 2026 WONxDEV
