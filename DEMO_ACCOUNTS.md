# Demo Accounts

RecisCare ships with five fictional accounts, one per role, so every part of the app is reachable without registration.

The fastest way in: open `index.html`, pick a role from the dropdown, and click **Lanjutkan** — no password needed. Email/password login (below) works too, since `DemoStore` checks credentials against the same seed data.

| Role | Email | Password | Class | Piket Day |
|---|---|---|---|---|
| Administrator | `admin@reciscare.demo` | `admin123` | Admin | Senin |
| Teacher | `teacher@reciscare.demo` | `teacher123` | Guru | Rabu |
| Class Leader | `leader@reciscare.demo` | `leader123` | XII B | Kamis |
| Student A | `siswaa@reciscare.demo` | `student123` | XII B | Kamis |
| Student B | `siswab@reciscare.demo` | `student123` | XII C | Jumat |

## Suggested Walkthrough

1. **Log in as Student A** → go to *Upload Bukti Piket*, attach any image, submit. Status shows as "Menunggu" (pending).
2. **Log out, log in as Teacher** → find the new submission, add a note, and click **Terima** or **Tolak**.
3. **Log out, log in as Student A again** → refresh and confirm the updated status and note appear in the history list.
4. **Log in as Administrator** → create/edit/delete a user from the *Kelola Pengguna* panel.
5. **Log in as Class Leader** → view today's duty schedule and submission count for XII B.
6. **As Teacher/Admin**, use the **⬇ CSV** button to export attendance records.

## Resetting Data

All demo data lives in the browser's `localStorage` and persists across page reloads. Use the **Reset Data Demo** link on the login screen at any time to wipe everything and reseed the original fictional accounts and records.

> These are throwaway demo credentials for a portfolio project — not real accounts, not a real school, and not meant for production use.
