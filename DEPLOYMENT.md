# Deployment Guide for Vercel

This guide helps you deploy GoCart to Vercel.

## Prerequisites

1. A Vercel account
2. A GitHub repository with your code

## Environment Variables

Make sure to set these environment variables in your Vercel project settings:

### Optional Variables

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics Measurement ID (format: `G-XXXXXXXXXX`)
- `NEXT_PUBLIC_CURRENCY_SYMBOL` - Currency symbol (default: `$`)

## Deployment Steps

### 1. Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository

### 2. Configure Environment Variables (Optional)

1. In your project settings, go to "Environment Variables"
2. Add any optional environment variables
3. Make sure to add them for Production, Preview, and Development environments

### 3. Build Settings

The project is configured with:
- **Build Command**: `next build`
- **Install Command**: `npm install`
- **Output Directory**: `.next` (default)

These are configured in `vercel.json` and `package.json`.

### 4. Deploy

1. Click "Deploy"
2. Vercel will:
   - Install dependencies
   - Build your Next.js application
   - Deploy to production

## Important Notes

### Data Storage

The admin panel uses **in-memory storage** for products and stores. This means:
- Data is stored in memory and will be lost when the server restarts
- This is suitable for development and testing
- For production, consider integrating a database (MongoDB, PostgreSQL, etc.)

### Admin Panel

- Access the admin panel at `/admin`
- Products can be added via `/admin/products/add`
- Products are stored in memory (will reset on server restart)

## Troubleshooting

### Build Errors

- Check that all dependencies are correctly listed in `package.json`
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

### API Routes Not Working

- Verify the API routes are in the `app/api` directory
- Check server logs in Vercel dashboard
- Ensure routes are properly exported

### Build Timeout

- If builds timeout, consider using Vercel's Pro plan for longer build times
- Check for large dependencies
- Optimize your build process

## Post-Deployment

After deployment:

1. Test your API routes: `/api/products`, `/api/stores`
2. Test the admin panel: `/admin`
3. Test adding products: `/admin/products/add`
4. Check Google Analytics (if configured)

## Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

