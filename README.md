# Contractor Website Builder

A premium SaaS product for contractors to build and deploy professional websites in 5 days for a fixed $1,999 price.

## Features

- **5 Premium Templates**: Modern Professional, Bold Authority, Industrial Strength, Minimalist, Trust Builder
- **Real-time Preview**: See changes instantly as you customize
- **Full Customization**: Edit business info, owner profile, services, testimonials
- **Mobile Responsive**: Works perfectly on all devices
- **SEO Optimized**: Built with search engine optimization in mind
- **5-Day Delivery**: Fixed timeline, no surprises
- **Lifetime Support**: Ongoing access and updates

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server will start at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/src
  ├── App.jsx          # Main component (all pages & logic)
  ├── main.jsx         # React entry point
  └── index.css        # Tailwind imports

/public
  └── index.html       # HTML template

package.json           # Dependencies & scripts
tailwind.config.js     # Tailwind configuration
postcss.config.js      # PostCSS configuration
vite.config.js         # Vite configuration
.claude/launch.json    # Claude Code dev server config
```

## Pages

1. **Landing** - Hero section with features and CTA
2. **Templates** - Choose from 5 premium templates
3. **Customize** - Edit business info, owner profile, services, testimonials with live preview
4. **Pricing** - Show $1,999 fixed price with features
5. **Checkout** - Order summary and payment (mock)

## Customization

All content is fully editable:
- Business name, service type, tagline, address, phone, email
- Owner name, bio, and photo
- 3 services with names and descriptions
- 3 testimonials with names, quotes, and ratings
- All template colors update smoothly when switching templates

## Design System

- **Typography**: Font-light (300) for premium aesthetic
- **Colors**: Dark gradient landing, white cards, template-based hero colors
- **Spacing**: Generous padding, minimal borders
- **Animations**: Smooth fadeInUp and slideInFromLeft on page loads
- **Interactions**: Smooth color transitions (500ms) when changing templates

## License

Proprietary - All rights reserved
