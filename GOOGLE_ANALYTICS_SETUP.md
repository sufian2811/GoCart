# Google Analytics Setup Guide

This guide will help you set up Google Analytics for your GoCart application.

## Prerequisites

1. A Google Analytics account
2. A Google Analytics 4 (GA4) property

## Setup Steps

### 1. Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property (or create a new one)
3. Go to **Admin** → **Data Streams**
4. Click on your web stream
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add Environment Variable

Add your Google Analytics Measurement ID to your `.env` file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 3. Restart Your Development Server

After adding the environment variable, restart your Next.js development server:

```bash
npm run dev
```

## What's Being Tracked

The integration automatically tracks:

### Page Views
- All page navigation is automatically tracked
- Page paths are sent to Google Analytics

### E-commerce Events

1. **Product Views** (`view_item`)
   - Triggered when a user views a product detail page
   - Includes product name and price

2. **Add to Cart** (`add_to_cart`)
   - Triggered when a user adds a product to cart
   - Includes product name and price

3. **Remove from Cart** (`remove_from_cart`)
   - Triggered when a user removes a product from cart
   - Includes product name and price

4. **Begin Checkout** (`begin_checkout`)
   - Triggered when a user views the cart page
   - Includes total cart value

5. **Purchase** (`purchase`)
   - Triggered when a user places an order
   - Includes transaction ID, total value, and item details

### Engagement Events

6. **Search** (`search`)
   - Triggered when a user searches for products
   - Includes the search term

## Using Analytics Functions

You can use the analytics utility functions in your components:

```javascript
import { event, addToCart, viewProduct, purchase } from '@/lib/analytics'

// Track a custom event
event({
    action: 'button_click',
    category: 'engagement',
    label: 'Newsletter Signup',
})

// Track product view
viewProduct(product)

// Track add to cart
addToCart(product)

// Track purchase
purchase(transactionId, totalValue, items)
```

## Available Functions

### Basic Events

- `pageview(url)` - Track page views
- `event({ action, category, label, value })` - Track custom events

### E-commerce Events

- `addToCart(product)` - Track add to cart
- `removeFromCart(product)` - Track remove from cart
- `viewProduct(product)` - Track product views
- `beginCheckout(cartValue)` - Track checkout initiation
- `purchase(transactionId, value, items)` - Track purchases

### Engagement Events

- `search(searchTerm)` - Track search queries

## Testing

1. Open your browser's Developer Tools
2. Go to the **Network** tab
3. Filter by `google-analytics.com` or `gtag`
4. Navigate through your site and perform actions
5. You should see requests being sent to Google Analytics

Alternatively, use the [Google Analytics DebugView](https://support.google.com/analytics/answer/7201382) to see real-time events.

## Disabling Analytics

To disable Google Analytics, simply remove or comment out the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable. The component will automatically skip loading the scripts if the ID is not provided.

## Privacy & GDPR Compliance

Make sure to:
- Add a cookie consent banner if required by your jurisdiction
- Update your privacy policy to mention Google Analytics
- Consider using Google Analytics' IP anonymization features

You can configure additional privacy settings in your Google Analytics property settings.

