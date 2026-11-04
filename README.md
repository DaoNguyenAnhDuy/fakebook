# Fakebook Authentication App

## Project Overview
A Next.js 13 app with a split‑screen UI (purple‑gradient left, login/registration form right). It uses **Prisma** with a SQLite database (`dev.db`) for user accounts. Passwords are hashed with scrypt. The UI matches the "Fakebook" design specifications (rounded inputs, animated collage, multi‑color gradient, etc.).

## Local Development
```bash
# Install dependencies
npm install

# Run in development mode (http://localhost:3000 or 3001 if port taken)
npm run dev
```

## Building & Starting in Production
```bash
npm run build   # Generates the .next folder
npm start       # Starts the production server
```

## Deploying to Vercel
1. **Create a Vercel project** and link it to this repository (or upload the source folder).
2. Vercel automatically runs `npm install && npm run build` during the build step.
3. **Environment Variables** – add a `DATABASE_URL` variable in the Vercel dashboard.
   - For SQLite you could set `DATABASE_URL=file:./dev.db`, but Vercel’s serverless functions **cannot persist** writes to the file system. The SQLite file will be read‑only and any changes (e.g., new user registrations) will be lost after each function invocation or redeployment.
4. **Deploy** – push to the linked Git branch or trigger a manual deployment from the Vercel UI.

## Data Persistence on Vercel
- **SQLite limitation**: Vercel’s serverless environment provides an **ephemeral filesystem**. While you can read a pre‑populated SQLite file bundled with the build, any write operations (user sign‑up, password changes) will be stored only in temporary `/tmp` storage and disappear when the function container is recycled.
- **Result**: If you deploy the app as‑is, users can register and log in during a single session, but their data will not survive a page refresh that triggers a new serverless instance, nor will it survive subsequent deployments.

## Recommended Approach for Production
1. **Switch to a managed database** (PostgreSQL, MySQL, etc.).
   - Vercel offers **Vercel Postgres** (free tier available). Create a database, obtain the connection string, and set it as `DATABASE_URL` in the Vercel dashboard.
   - Update `prisma/schema.prisma` to use `provider = "postgresql"` (or `"mysql"`). Run `npx prisma migrate dev` locally, commit the migration files, and Vercel will apply them during the build.
2. **Optional: Use a hosted SQLite alternative** such as `sqlite-cloud` if you strictly need SQLite semantics, but a hosted relational DB is generally preferred.

## Updating the Project for a New DB
```bash
# Install the appropriate client (example for PostgreSQL)
npm install @prisma/client

# Edit prisma/schema.prisma
# provider = "postgresql"
# url = env("DATABASE_URL")

# Generate client and run migration
npx prisma generate
npx prisma migrate deploy   # Vercel will run this during build
```

## Summary
- Deploying the current app to Vercel **will work**, but **user data will not be persisted** because SQLite cannot write to the immutable serverless filesystem.
- For a reliable production deployment, configure an external database (e.g., Vercel Postgres) and update the Prisma schema and `DATABASE_URL` accordingly.

---
Feel free to ask if you need help migrating to PostgreSQL or configuring the Vercel environment variables.
