## OpsBoard – Start Here (I’ll walk you through it)

I’m building OpsBoard to feel like the real client-ops portals we ship in agencies. Here’s the exact checklist I follow to get it running locally.

### 1. Install the basics
- Node.js 18+ (grab the LTS installer from nodejs.org and restart PowerShell afterward)
- PostgreSQL (I use the Windows installer and keep the `postgres` user/password set to `postgres`)

### 2. Pull the code and install packages
```bash
git clone https://github.com/<SeloSlav>/opsboard.git
cd opsboard
npm install
```

### 3. Create the database
```bash
psql -U postgres -c "CREATE DATABASE opsboard;"
```
If `psql` isn’t on your PATH, add `"C:\\Program Files\\PostgreSQL\\16\\bin"` to it.

### 4. Configure environment variables
Duplicate `.env.example` to `.env` and fill in real secrets:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/opsboard"
NEXTAUTH_SECRET="<python -c \"import secrets; print(secrets.token_urlsafe(64))\">"
GITHUB_ID="<GitHub OAuth client ID>"
GITHUB_SECRET="<GitHub OAuth client secret>"
```
### 5. Migrate + seed data
```bash
npx prisma migrate dev --name init
npm run db:seed
```
This builds the schema and drops in a demo org, user, and a few tickets.

### 6. Update schema changes later
Whenever you edit `prisma/schema.prisma`, run the Prisma pipeline so the database and generated client stay in sync:
```bash
npx prisma migrate dev --name describe_the_change
npx prisma generate
```
Restart the dev server (`CTRL+C`, then `npm run dev`) so Next.js picks up the regenerated client. On Windows/OneDrive, pause sync while these commands run if you hit `EPERM ... rename ... query_engine-windows.dll.node` errors, then resume afterward.

### 6. Fire up the app
```bash
npm run dev
```
Open http://localhost:3000, sign in with GitHub, and you’ll land on the dashboard.

### 7. Project map
- `app/` – Next.js App Router pages, API routes, UI pieces
- `app/lib/` – Prisma client, auth helpers, RBAC checks
- `prisma/schema.prisma` – the data model
- `prisma/seed.ts` – demo data script
- `tests/` – Vitest + Playwright (as they come online)

### 8. Handy commands
```bash
npm run dev       # local dev server
npm run lint      # ESLint across the project
npm test          # Vitest (once tests exist)
npx prisma studio # quick data browser
```

### 9. Deploying to Railway (my plan)
1. Push this repo to GitHub.
2. On Railway, create a project, add a PostgreSQL service, then deploy this repo as a web service.
3. Copy the env vars—Railway gives you the `DATABASE_URL`.
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Postdeploy command: `npx prisma migrate deploy`

Follow these steps and you’ll have the same setup I’m running. Ping me if anything feels off!
