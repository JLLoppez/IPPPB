# IPPPB Next.js - Termux Friendly

This version was adapted to run on **Termux / Android**.

## What changed
- Prisma was removed.
- Data is stored in `data/db.json`.
- The admin dashboard, portal login, gallery, courses, announcements, messages, and applications still work.
- Seed data is loaded with `npm run seed`.

## Run on Termux

```bash
pkg update && pkg install nodejs
cd ~/projects/ipppb-next-admin-portal-gallery
npm install
cp .env.example .env.local
cp .env.example .env
npm run seed
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Then open:
- `http://127.0.0.1:3000`
- or `http://localhost:3000`

## Admin login
Set these in `.env` and `.env.local`:

```env
ADMIN_PASSWORD="your-admin-password"
SESSION_PASSWORD="a-very-long-secret-at-least-32-characters"
PORTAL_ADMIN_EMAIL="admin@example.com"
PORTAL_ADMIN_PASSWORD="admin123456"
```

## Storage
All editable content is saved in:

```text
data/db.json
```

Uploads remain inside `public/uploads/...`.
