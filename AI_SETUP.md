# AI Text Generation Setup

This guide explains how to set up AI-powered text generation for product titles and descriptions in the admin panel.

## Features

The admin add product page now includes AI-powered buttons to:
- **Generate Product Titles**: Creates catchy, SEO-friendly product names
- **Generate Product Descriptions**: Creates detailed, compelling product descriptions

## Setup Instructions

### 1. Get OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to your [API Keys](https://openrouter.ai/keys) page
4. Create a new API key
5. Copy your API key

### 2. Add Environment Variable

Add your OpenRouter API key to your environment variables:

**For Local Development:**
Create or update your `.env.local` file:
```env
NEXT_PUBLIC_OPENROUTER_API_KEY="sk-or-v1-your-api-key-here"
```

**For Vercel Deployment:**
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name**: `NEXT_PUBLIC_OPENROUTER_API_KEY`
   - **Value**: Your OpenRouter API key
   - **Environment**: Production, Preview, Development (select all)

### 3. Restart Your Development Server

After adding the environment variable, restart your Next.js development server:

```bash
npm run dev
```

## Usage

### Generating Product Title

1. Navigate to `/admin/products/add`
2. Optionally enter a product name or select a category
3. Click the **"Generate with AI"** button next to the Name field
4. The AI will generate a catchy product title based on your input

### Generating Product Description

1. Enter a product name or some description text
2. Click the **"Generate with AI"** button next to the Description field
3. The AI will generate a detailed product description

## How It Works

- **Title Generation**: Creates SEO-friendly, concise titles (under 60 characters)
- **Description Generation**: Creates detailed descriptions (100-200 words) with features and benefits
- The AI uses context from:
  - Product name (if entered)
  - Product category (if selected)
  - Existing description (for description generation)

## API Details

- **Service**: OpenRouter.ai
- **Model**: GPT-3.5-turbo
- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Max Tokens**: 
  - Title: 50 tokens
  - Description: 200 tokens

## Troubleshooting

### "OpenRouter API key is not configured"

- Make sure you've added `NEXT_PUBLIC_OPENROUTER_API_KEY` to your environment variables
- Restart your development server after adding the variable
- For production, ensure the variable is set in Vercel

### "Failed to generate text"

- Check that your API key is valid
- Verify you have credits in your OpenRouter account
- Check the browser console for detailed error messages
- Ensure your API key has the correct permissions

### Generation is slow

- This is normal - AI generation takes a few seconds
- The loading spinner indicates the request is in progress
- If it takes more than 30 seconds, check your internet connection

## Cost Considerations

- OpenRouter charges based on token usage
- GPT-3.5-turbo is cost-effective for this use case
- Monitor your usage in the OpenRouter dashboard
- Consider setting usage limits if needed

## Customization

You can customize the prompts in `app/admin/products/add/page.jsx`:

```javascript
const prompt = field === "name"
    ? `Your custom title generation prompt`
    : `Your custom description generation prompt`
```

## Security Notes

- The API key is exposed to the client (NEXT_PUBLIC_ prefix)
- For production, consider creating a server-side API route to proxy requests
- This keeps your API key secure on the server
- See Next.js documentation for creating API routes

