# SNT Solutions - Next.js Portfolio Website

A modern, personal portfolio website for SNT Solutions built with Next.js 14, TypeScript, and Tailwind CSS v3. Features a clean design, services showcase, and contact form.

## 🚀 Features

### Design & Animation
- **Portal Entry Animation** - Immersive animated portal entrance with glowing effects
- **Dark Theme** - Modern dark color scheme with purple gradient accents
- **Responsive Design** - Mobile-first approach (320px, 768px, 1024px+ breakpoints)
- **Micro-interactions** - Smooth transitions and hover effects throughout
- **Performance Optimized** - 60fps animations, image optimization, lazy loading

### Content Management
- **Services Section** - Showcase of services offered
  - Building Websites (Next.js & React)
  - Customized Notion Systems with AI
  - AI Agents & Automations
- **Testimonials** - Client feedback carousel

### Pages & Sections
- **Homepage** - Hero section, services, testimonials, contact CTA
- **Contact** - Contact form with validation and company information

### Technical Features
- **Next.js 14** - App router, server components, static generation
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS v3** - Utility-first CSS framework with custom design system
- **Markdown Processing** - gray-matter, remark, and HTML conversion
- **SEO Optimized** - Meta tags, structured data, Open Graph
- **Accessibility** - WCAG 2.1 AA compliant
- **Performance** - Lighthouse 90+ performance score target

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Content**: Markdown with gray-matter
- **Build**: Vercel-optimized

## 📁 Project Structure

```
snt-solutions/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with header/footer
│   ├── page.tsx                 # Homepage (single scrollable page)
│   ├── contact/                 # Contact page
│   └── globals.css              # Global styles and Tailwind
├── components/                   # Reusable components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Site footer
│   ├── SectionDivider.tsx       # Visual section dividers
│   └── TrustedCompaniesCarousel.tsx  # Partners carousel (unused)
├── lib/                         # Utility functions
│   ├── types.ts                 # TypeScript type definitions
│   └── hooks/                   # Custom React hooks
│       └── useScrollDirection.ts # Scroll behavior hook
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SalahDevv28/My-Portfolio.git
   cd snt-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build Commands

- **Development**: `npm run dev` - Start development server
- **Build**: `npm run build` - Create production build
- **Start**: `npm start` - Start production server
- **Lint**: `npm run lint` - Run ESLint

## 📝 Content Management

### Adding Blog Posts

1. Create a new markdown file in `content/blog/`
2. Add frontmatter with required fields:
   ```markdown
   ---
   title: "Your Post Title"
   excerpt: "Brief description of the post"
   author: "Author Name"
   date: "2024-11-08"
   category: "Category Name"
   tags: ["tag1", "tag2", "tag3"]
   featuredImage: "https://example.com/image.jpg"
   readTime: 5
   ---
   ```

3. Write your content in markdown format below the frontmatter
4. The post will automatically be available at `/blog/slug`

### Adding Case Studies

1. Create a new markdown file in `content/case-studies/`
2. Add frontmatter with project details:
   ```markdown
   ---
   title: "Project Title"
   client: "Client Name"
   description: "Project description"
   challenge: "Project challenges"
   solution: "Our solution approach"
   results: ["Result 1", "Result 2"]
   technologies: ["Tech 1", "Tech 2"]
   images: ["image1.jpg", "image2.jpg"]
   category: "Project Category"
   duration: "6 months"
   teamSize: 4
   ---
   ```

## 🎨 Design System

### Colors
- **Background**: `#0A0A0A` (Primary dark)
- **Purple Gradients**: `#8B5CF6` to `#A855F7`
- **Text**: `#FFFFFF` (Primary), `#F3F4F6` (Secondary)
- **Accents**: Various purple shades for interactive elements

### Typography
- **Headings**: Poppins (font-heading)
- **Body**: Inter (font-sans)
- **Responsive scaling**: 320px → 768px → 1024px+

### Components
- **Cards**: Dark background, border, hover effects
- **Buttons**: Primary (purple gradient), Secondary (outline)
- **Forms**: Dark inputs with purple focus states

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Import project from GitHub
   - Vercel auto-detects Next.js configuration

2. **Environment Variables**
   Add in Vercel dashboard:
   ```
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```

3. **Deploy**
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Deploy to your hosting provider**
   - Upload `.next` folder and `package.json`
   - Set environment variables
   - Run `npm start`

## 🔧 Configuration

### Tailwind CSS
Custom design system configuration in `tailwind.config.ts`:
- Custom color palette
- Custom animations (portal glow, fade-in, slide-up)
- Responsive breakpoints
- Custom utilities and components

### Next.js
Configuration in `next.config.js`:
- App directory enabled
- Image optimization settings
- Performance optimizations

### TypeScript
Configured in `tsconfig.json`:
- Path aliases for clean imports
- Strict mode enabled
- Modern target (ES2020)

## 📊 Performance

- **Lighthouse Score**: 90+ target
- **First Contentful Paint**: <1.5s target
- **Time to Interactive**: <3s target
- **Bundle Size**: Optimized with code splitting

## ♿ Accessibility

- **WCAG 2.1 AA** compliance
- **Keyboard navigation** support
- **Screen reader** optimization
- **Color contrast** ratios
- **Focus management**

## 📈 SEO

- **Meta tags** on all pages
- **Open Graph** tags for social sharing
- **Structured data** for better indexing
- **Sitemap** generation
- **Optimized images** with alt text

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or support, contact:
- Email: hello@snt-solutions.com
- Phone: +1 (555) 123-4567

## 🔗 Links

- **Website**: [snt-solutions.com](https://snt-solutions.com)
- **Blog**: [snt-solutions.com/blog](https://snt-solutions.com/blog)
- **Case Studies**: [snt-solutions.com/case-studies](https://snt-solutions.com/case-studies)

---

Built with ❤️ by SNT Solutions Team