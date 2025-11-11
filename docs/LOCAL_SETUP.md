```markdown
# Local development setup (Media-Careers-India)

This document explains the quick steps to get the app running locally and includes a helper script to diagnose and fix common environment issues.

## Environment file (.env)
Create a `.env` file in the project root. Example entries used for local development (DO NOT use these in production):

```
ADMIN_USER=phildass
ADMIN_PASS=ChangeMe123!
ADMIN_JWT_SECRET=some_long_random_secret
DATABASE_URL=file:./dev.db
```

Important: each variable must be on its own line. A single-line `.env` containing multiple variables (e.g. `ADMIN_USER=x ADMIN_PASS=y`) will not be parsed correctly.

## Start the app
1. Install dependencies:

```bash
npm install
```

2. Run Prisma migrations (if needed):

```bash
npx prisma generate
npx prisma migrate dev --name init
```

3. Start the dev server (binds to all interfaces):

```powershell
$env:HOST='0.0.0.0'; $env:PORT='3000'; npm run dev
```

Open http://localhost:3000 in your browser.

## Helper script
A helper PowerShell script is available at `scripts/fix-and-start.ps1`. It:
- backs up `.env`
- splits a single-line `.env` with multiple ADMIN_* variables into separate lines
- optionally kills hung node processes
- launches the dev server in a new terminal bound to 0.0.0.0:3000
- polls the server until it responds and calls a safe debug endpoint

Usage:

```powershell
# from project root
.\scripts\fix-and-start.ps1
```

To run the login test (interactive prompt):

```powershell
.\scripts\fix-and-start.ps1 -RunLoginTest
```

The script does NOT send or log secret values and is intended only for local development.
PR test: confirm compare
```
