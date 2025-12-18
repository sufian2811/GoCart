# Deployment Guide for Vercel

This guide helps you deploy GoCart to Vercel with Prisma.

## Prerequisites

1. A Vercel account
2. A PostgreSQL database (can use Vercel Postgres, Supabase, or any PostgreSQL provider)
3. Your database connection strings

## Environment Variables

Make sure to set these environment variables in your Vercel project settings:

### Required Variables

- `DATABASE_URL` - Your PostgreSQL connection string
- `DIRECT_URL` - Your direct PostgreSQL connection string (if using connection pooling)

### Optional Variables

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics Measurement ID (format: `G-XXXXXXXXXX`)
- `NEXT_PUBLIC_CURRENCY_SYMBOL` - Currency symbol (default: `$`)

## Deployment Steps

### 1. Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository

### 2. Configure Environment Variables

1. In your project settings, go to "Environment Variables"
2. Add all required environment variables
3. Make sure to add them for Production, Preview, and Development environments

### 3. Build Settings

The project is configured with:
- **Build Command**: `prisma generate && next build`
- **Install Command**: `npm install`
- **Output Directory**: `.next` (default)

These are configured in `vercel.json` and `package.json`.

### 4. Deploy

1. Click "Deploy"
2. Vercel will:
   - Install dependencies
   - Run `prisma generate` (via postinstall script)
   - Build your Next.js application
   - Deploy to production

## Troubleshooting

### Prisma Client Not Found Error

If you see `Cannot find module '.prisma/client/default'`:

1. **Check Prisma is in dependencies**: Ensure `prisma` is in `dependencies` (not `devDependencies`) in `package.json`

2. **Verify postinstall script**: Make sure `package.json` has:
   ```json
   "postinstall": "prisma generate"
   ```

3. **Check build command**: Ensure `vercel.json` or build settings include:
   ```json
   "buildCommand": "prisma generate && next build"
   ```

4. **Verify environment variables**: Make sure `DATABASE_URL` and `DIRECT_URL` are set in Vercel

5. **Check Prisma config**: Ensure `prisma.config.ts` exists in the root directory

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Check if your database allows connections from Vercel's IP addresses
- For connection pooling, ensure `DIRECT_URL` is set correctly

### Build Timeout

- If builds timeout, consider using Vercel's Pro plan for longer build times
- Optimize your Prisma queries
- Check for large dependencies

## Post-Deployment

After deployment:

1. Test your API routes: `/api/products`, `/api/stores`
2. Verify database connections
3. Test the admin panel: `/admin`
4. Check Google Analytics (if configured)

## Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

