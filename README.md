# Modern Blog Platform

A sophisticated blog platform built with Next.js 15 and TypeScript, featuring dynamic content management through Cosmic CMS. This application showcases blog posts, author profiles, and category organization with a clean, responsive design.

![App Preview](https://imgix.cosmicjs.com/60d44960-7938-11f0-a051-23c10f41277a-photo-1506126613408-eca07ce68773-1755194349427.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## Features

- 📝 Dynamic blog posts with markdown support
- 👤 Author profiles with social links
- 🏷️ Category-based content organization
- 📱 Fully responsive design
- 🔍 SEO optimized with dynamic meta tags
- ⚡ Fast page loads with Next.js 15
- 🖼️ Optimized images via imgix
- 🎨 Clean, modern UI with Tailwind CSS

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=689e1d6cadc4af3c1104d08a&clone_repository=689e2cc628031fe3849aceb0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Image Optimization**: imgix
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account with configured bucket
- Environment variables (see below)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Posts
```typescript
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['title', 'slug', 'metadata'])
  .depth(1);
```

### Getting Single Post
```typescript
const post = await cosmic.objects
  .findOne({ slug: 'post-slug', type: 'posts' })
  .depth(1);
```

## Cosmic CMS Integration

This application is fully integrated with Cosmic CMS, utilizing:

- **Posts**: Blog posts with markdown content, featured images, and SEO metadata
- **Authors**: Author profiles with bio, social links, and profile photos
- **Categories**: Content categorization with descriptions and thumbnails

The content structure is type-safe with comprehensive TypeScript definitions.

## Deployment Options

### Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Netlify
1. Push to GitHub
2. Import to Netlify
3. Add environment variables
4. Deploy

### Environment Variables
Configure these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->