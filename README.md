# BUNCH & CO. Website

A premium product catalogue website for BUNCH & CO. built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

## 📦 Adding New Products

All products are managed in a single file: [`src/data/products.ts`](src/data/products.ts)

To add a new product:

1. **Add your product images** to `public/images/products/your-product-name/`
2. **Open** `src/data/products.ts`
3. **Copy the template comment** at the bottom of the `products` array and fill in the details
4. **Save** — the product will appear automatically across the entire website

Each product supports:
- Name, brand, category, price
- Multiple images (gallery)
- Features list
- Technical specifications table
- Availability status
- WhatsApp order message
- Featured / New Arrival flags

## 🌐 Languages

The website supports:
- English (default)
- Malayalam (മലയാളം)
- Hindi (हिंदी)

Translations are in [`src/data/translations.ts`](src/data/translations.ts).

## 📱 Pages

| Page | URL |
|------|-----|
| Home | `/` |
| Shop / All Products | `/shop` |
| Product Detail | `/shop/[product-slug]` |
| About Us | `/about` |
| Contact | `/contact` |

## 🛒 Ordering

The website is a product discovery catalogue. Customers order via WhatsApp:

**WhatsApp Number:** +91 89212 67174

## 🚀 Deployment (Vercel)

1. Push this folder to a GitHub repository
2. Connect the repository to [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

## 🎨 Brand Colours

| Colour | Value |
|--------|-------|
| Navy | `#1a2d5a` |
| Orange | `#e8671a` |
| Ivory | `#faf8f4` |
| White | `#ffffff` |
