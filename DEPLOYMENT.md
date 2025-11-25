# Vercel Deployment Guide

This guide walks you through deploying SellReady to Vercel.

## Quick Start

1. **Install Vercel CLI** (if not already installed):
   ```sh
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```sh
   vercel login
   ```

3. **Deploy**:
   ```sh
   vercel --prod
   ```

## Detailed Steps

### 1. Environment Variables

Before deploying, set these environment variables in the Vercel dashboard (Project Settings → Environment Variables):

- **`OPENAI_API_KEY`** (Required)
  - Your OpenAI API key
  - Format: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx`
  - Used by all three LLM calls

- **`VITE_API_URL`** (Optional for same-domain deployment)
  - For Vercel: Leave empty or set to your deployment URL (e.g., `https://your-project.vercel.app`)
  - For local dev: Set to `http://localhost:3001`
  - The frontend will use relative paths if this is empty in production

### 2. Project Structure

Vercel automatically detects:
- **Frontend**: Vite build output in `dist/` (configured in `vercel.json`)
- **Backend**: Serverless functions in `api/` directory

### 3. API Endpoints

The following endpoints are available after deployment:

- `POST /api/analyze/start` - Website intelligence extraction (Call 1)
- `POST /api/analyze` - Full analysis chain (Calls 2-3 + calculations)
- `GET /api/health` - Health check

### 4. Deployment Process

1. **First Deploy**:
   ```sh
   vercel
   ```
   This creates a preview deployment. Note the URL.

2. **Set VITE_API_URL** (if needed):
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `VITE_API_URL` with your deployment URL
   - Redeploy to apply changes

3. **Production Deploy**:
   ```sh
   vercel --prod
   ```

### 5. Local Testing with Vercel

Test the full Vercel setup locally:

```sh
vercel dev
```

This runs:
- Frontend on `http://localhost:3000`
- API functions on `http://localhost:3000/api/*`

### 6. Troubleshooting

**Issue: API functions return 404**
- Check that files in `api/` are named correctly
- Ensure `vercel.json` is in the root directory
- Check Vercel function logs in the dashboard

**Issue: Environment variables not working**
- Verify variables are set in Vercel dashboard
- Ensure they're set for the correct environment (Production, Preview, Development)
- Redeploy after adding/changing variables

**Issue: CORS errors**
- The API functions include CORS headers
- If issues persist, check the `Access-Control-Allow-Origin` header in `api/*.ts` files

**Issue: LLM calls failing**
- Verify `OPENAI_API_KEY` is set correctly
- Check OpenAI API usage/quota
- Review function logs in Vercel dashboard

### 7. Custom Domain

To add a custom domain:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update `VITE_API_URL` if needed

### 8. Monitoring

- **Function Logs**: Vercel Dashboard → Your Project → Functions → View Logs
- **Analytics**: Vercel Dashboard → Your Project → Analytics
- **Deployments**: Vercel Dashboard → Your Project → Deployments

## Architecture Notes

- **Frontend**: Static files served from `dist/` (Vite build output)
- **Backend**: Serverless functions in `api/` (automatically converted from TypeScript)
- **Same Domain**: Frontend and API are on the same domain, so relative paths work
- **Timeout**: API functions have a 60-second max duration (configured in `vercel.json`)

## Cost Considerations

- Vercel Hobby plan: Free for personal projects
- Serverless function execution time: Counts toward usage limits
- OpenAI API: Pay-per-use based on model and tokens

