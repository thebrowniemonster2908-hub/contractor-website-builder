# Contractor Website Builder - SaaS Platform

A premium, full-stack SaaS product that allows contractors to build professional websites in 5 days for a fixed $1,999 price.

## 🚀 Features

- **5 Professional Templates**: Modern Professional, Bold Authority, Industrial Strength, Minimalist, Trust Builder
- **Real-Time Preview**: See changes instantly as you customize
- **Complete Customization**:
  - Business information & branding
  - Owner profile with photo
  - Services (3 editable sections)
  - Customer testimonials with ratings
- **Premium Aesthetic**: Light typography, elegant spacing, smooth animations
- **Mobile Responsive**: Works perfectly on all devices
- **SEO Optimized**: Built-in optimization for search engines
- **Fixed Pricing**: $1,999 one-time payment, no surprises

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Backend**: Vercel Edge Functions / Node.js API Routes
- **Database**: Supabase PostgreSQL
- **Payments**: Stripe
- **Deployment**: Vercel

## 📋 Project Structure

```
├── src/
│   ├── App.jsx              # Main component with all pages
│   ├── supabaseClient.js    # Supabase integration
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── api/
│   ├── create-order.js      # Order creation endpoint
│   └── webhook.js           # Stripe webhook handler
├── .env                     # Environment variables
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── vercel.json              # Vercel deployment config
└── package.json             # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account (free tier available)
- Stripe account (optional for production)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file with:
   - Supabase URL and key
   - Stripe public key
   - Base URL for redirects

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

Create a production build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## 📱 Pages

### 1. Landing Page
- Hero section with main value proposition
- Feature checklist
- Social proof
- CTA button to get started

### 2. Template Selection
- Browse 5 professional templates
- Visual color previews
- Click to select and proceed

### 3. Customization
- Two-column layout with live preview
- Edit all website content in real-time
- Business info, owner profile, services, testimonials
- All changes update instantly

### 4. Pricing
- Simple, transparent pricing
- $1,999 one-time payment
- List of included features
- Proceed to checkout

### 5. Checkout
- Order summary
- Final confirmation
- Payment processing

## 🎨 Design System

### Typography
- Font Weight: Light (300) throughout for premium feel
- Heading Tracking: Tight (-0.025em)
- Wide spacing for elegance

### Colors
- Landing: Dark gradient (gray-900 to gray-800)
- Templates: White backgrounds with colored hero sections
- Accents: Template-specific accent colors

### Spacing
- Generous padding (p-6, p-8)
- Minimal borders (border-gray-200, border-gray-300)
- Elegant hover effects with smooth transitions

### Animations
- fadeInUp: 0.8s ease-out
- slideInFromLeft: 0.8s ease-out
- Color transitions: 500ms

## 🔧 API Endpoints

### POST /api/create-order
Creates a new order and Stripe checkout session.

**Request:**
```json
{
  "businessName": "string",
  "serviceType": "string",
  "phone": "string",
  "email": "string",
  "address": "string",
  "tagline": "string",
  "ownerName": "string",
  "ownerBio": "string",
  "ownerImage": "string",
  "services": [{ "name": "string", "desc": "string" }],
  "testimonials": [{ "name": "string", "text": "string", "rating": 5 }],
  "templateId": "string"
}
```

**Response:**
```json
{
  "sessionId": "string",
  "orderId": "string"
}
```

### POST /api/webhook
Stripe webhook endpoint for payment confirmations.

## 🗄️ Database Schema

### Orders Table
- id (uuid)
- business_name (text)
- service_type (text)
- phone (text)
- email (text)
- address (text)
- tagline (text)
- owner_name (text)
- owner_bio (text)
- owner_image (text)
- services (jsonb)
- testimonials (jsonb)
- template_id (text)
- status (text)
- price (integer)
- stripe_session_id (text)
- stripe_payment_intent (text)
- created_at (timestamp)
- paid_at (timestamp)

### Websites Table
- id (uuid)
- order_id (uuid)
- business_name (text)
- template_id (text)
- data (jsonb)
- domain (text)
- deployed_at (timestamp)
- status (text)

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub:
```bash
git push origin main
```

2. Deploy to Vercel:
```bash
npm run deploy
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables

Set these in Vercel dashboard:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_KEY`: Service role key for backend
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Webhook signing secret
- `NEXT_PUBLIC_BASE_URL`: Your production URL

## 📊 Pricing Model

- **One-time fee**: $1,999 per website
- **Included**: All templates, customization, 5-day delivery
- **Support**: Lifetime access and updates

## 🔐 Security

- All payments handled by Stripe (PCI compliant)
- Supabase Row-Level Security (RLS) policies
- Environment variables for sensitive keys
- CORS configuration for API endpoints

## 📝 License

© 2024 Contractor Website Builder. All rights reserved.

## 🤝 Support

For support, contact: support@contractorwebsitebuilder.com
