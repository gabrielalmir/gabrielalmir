<img width="100%" src="./docs/cover.jpg" />

# Gabriel Almir - Portfolio & Blog

## 🚀 About This Project

This is my personal portfolio website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, featuring a modern terminal-inspired design. The site showcases my work as a Backend Software Engineer and includes a technical blog and detailed case studies.

### ✨ Features

- **🎨 Terminal-inspired Design**: Modern aesthetic with terminal elements, scanline effects, and green monospace typography
- **📝 Technical Blog**: Articles about backend development, architecture, and software engineering
- **🏆 Case Studies**: Detailed project breakdowns with metrics, challenges, and solutions
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Performance Optimized**: Built with Next.js 15 and optimized for speed
- **🔍 SEO Ready**: Meta tags, structured data, and social sharing optimization

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom terminal theme
- **Animations**: Framer Motion
- **Icons**: Lucide React + DevIcons
- **Deployment**: Vercel (recommended)

## 📖 About Me

### Software Engineer | Backend Developer
#### Node.js, TypeScript, NestJS, Fastify, Next.js, React.js, Docker & AWS

I am a Backend Developer with extensive experience in **Node.js**, specializing in building scalable, high-performance, and maintainable systems. I thrive on developing clean and efficient architectures, following best practices such as **Clean Architecture, SOLID principles, and Design Patterns**.

With a strong background in **microservices, RESTful APIs, and database integrations (SQL & NoSQL)**, I am passionate about delivering business-driven solutions while ensuring technical excellence. I also have hands-on experience with **containerization (Docker, Kubernetes) and cloud computing (AWS, Terraform)**, enabling optimized deployments and seamless scalability.

### Technologies I Work With
<div align="left">
  <img src="https://skillicons.dev/icons?i=ts" height="30" alt="typescript logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=js" height="30" alt="javascript logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nestjs" height="30" alt="nestjs logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nodejs" height="30" alt="nodejs logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nextjs" height="30" alt="nextjs logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=react" height="30" alt="react logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=postgresql" height="30" alt="postgresql logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=mongodb" height="30" alt="mongodb logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=docker" height="30" alt="docker logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=kubernetes" height="30" alt="kubernetes logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=aws" height="30" alt="aws logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=terraform" height="30" alt="terraform logo" />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=git" height="30" alt="git logo" />
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gabrielalmir/gabrielalmir.git
cd gabrielalmir
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── blog/                 # Blog pages
│   │   ├── page.tsx         # Blog listing
│   │   └── [id]/page.tsx    # Individual blog post
│   ├── case-studies/        # Case studies pages
│   │   ├── page.tsx         # Case studies listing
│   │   └── [id]/page.tsx    # Individual case study
│   ├── globals.css          # Global styles with terminal theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── breadcrumb.tsx       # Navigation breadcrumbs
│   ├── loading-skeleton.tsx # Loading states
│   ├── seo.tsx              # SEO optimization
│   └── ...
└── lib/
    └── utils.ts             # Utility functions
```

## 📝 Blog & Case Studies

### Blog Features
- **Search & Filters**: Find articles by title, content, category, or tags
- **Categories**: Technical, Career, and Insights
- **Reading Time**: Estimated time for each article
- **Responsive Design**: Optimized reading experience on all devices

### Case Studies Features
- **Detailed Metrics**: Quantifiable results and improvements
- **Technical Implementation**: Code examples and architecture details
- **Challenge & Solution**: Problem-solving approach documentation
- **Technology Stack**: Complete list of tools and frameworks used

## 🎨 Design System

### Terminal Theme
- **Primary Color**: Terminal Green (`#99ffe4`)
- **Background**: Dark zinc (`#09090b`)
- **Typography**: Monospace fonts for authentic terminal feel
- **Effects**: Scanlines, glow, and subtle animations

### Components
- **Terminal Windows**: Card-like containers with terminal aesthetics
- **Terminal Buttons**: Interactive elements with hover effects
- **Terminal Prompts**: Command-line style text indicators
- **Loading Skeletons**: Smooth loading states

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **SEO Optimized**: Meta tags, structured data, and social sharing
- **Responsive Images**: Optimized loading with Next.js Image component

## 🔧 Customization

### Adding New Blog Posts
1. Add post data to the `blogPosts` array in `/blog/page.tsx`
2. Create content with Markdown support
3. Add appropriate tags and category

### Adding New Case Studies
1. Add study data to the `caseStudies` array in `/case-studies/page.tsx`
2. Include metrics, technologies, and detailed implementation
3. Set featured status for highlighting

### Styling
- Modify `globals.css` for global theme changes
- Update Tailwind config for color scheme adjustments
- Customize terminal effects and animations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/gabrielalmir/gabrielalmir/issues).

### Get in Touch
<div align="left">
  <a href="https://www.youtube.com/channel/UCxC8qVMJwikrtnwWtHQgi0Q" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Youtube&logo=youtube&label=&color=FF0000&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="youtube logo" />
  </a>
  <a href="https://www.instagram.com/momentoalmir/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Instagram&logo=instagram&label=&color=E4405F&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="instagram logo" />
  </a>
  <a href="https://www.linkedin.com/in/gabrielalmir/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=LinkedIn&logo=linkedin&label=&color=0077B5&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="linkedin logo" />
  </a>
  <a href="https://github.com/gabrielalmir" target="_blank">
    <img src="https://img.shields.io/static/v1?message=GitHub&logo=github&label=&color=181717&logoColor=white&labelColor=&style=for-the-badge" height="35" alt="github logo" />
  </a>
</div>

---

<div align="center">
  <p>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS</p>
  <p>© 2024 Gabriel Almir. All rights reserved.</p>
</div>
