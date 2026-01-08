# Next Orbital Code

A modern, dark-themed website for Next Orbital Code — a tech company specializing in System Design, Software Architecture, Cloud Solutions, AI, Blockchain, and Web Development.

Built with [Hugo](https://gohugo.io/) and a custom theme.

## Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.100.0+)
- [Docker](https://docs.docker.com/get-docker/) (optional, for containerized deployment)

### Development

```bash
# Clone the repository
git clone https://github.com/nextorbitalcode/website.git
cd website

# Start development server
hugo server --buildDrafts

# Site is available at http://localhost:1313
```

### Build for Production

```bash
hugo --minify
```

Static files are output to the `public/` directory.

## Project Structure

```
.
├── content/                 # Markdown content
│   ├── _index.md           # Landing page
│   ├── about.md            # About Us
│   └── contact.md          # Contact Us
├── themes/nextorbital/     # Custom theme
│   ├── layouts/            # HTML templates
│   │   ├── _default/       # Base templates
│   │   ├── partials/       # Reusable components
│   │   └── index.html      # Homepage template
│   └── static/             # Theme assets
│       ├── css/main.css    # Styles
│       └── js/main.js      # JavaScript
├── static/                 # Static assets
│   └── images/             # Images and favicon
├── hugo.toml               # Site configuration
├── Dockerfile              # Docker build
├── docker-compose.yml      # Docker Compose config
└── nginx.conf              # Nginx configuration
```

## Docker Deployment

### Build and Run Locally

```bash
docker compose up --build
# Site available at http://localhost:8080
```

### Production Build

```bash
# Build image
docker build -t nextorbital:latest .

# Run container
docker run -d -p 80:80 nextorbital:latest
```

## Deployment Options

| Platform | Deployment |
|----------|------------|
| **Fly.io** | `fly launch && fly deploy` |
| **Railway** | Connect repo for auto-deploy |
| **Google Cloud Run** | `gcloud run deploy --source .` |
| **AWS ECS** | Push to ECR, create ECS service |
| **Any VPS** | `docker compose up -d` |

## Configuration

Edit `hugo.toml` to customize:

```toml
baseURL = 'https://nextorbitalcode.com/'
title = 'Next Orbital Code'

[params]
  description = "Your company description"
  tagline = "Your tagline"

[params.social]
  github = "https://github.com/yourcompany"
  linkedin = "https://linkedin.com/company/yourcompany"
  twitter = "https://twitter.com/yourcompany"
```

## Adding Content

### New Page

```bash
hugo new pagename.md
```

Edit the generated file in `content/pagename.md`.

### Modify Navigation

Edit the menu in `hugo.toml`:

```toml
[[menus.main]]
  name = 'New Page'
  pageRef = '/pagename'
  weight = 40
```

## Theme Customization

### Colors

Edit CSS variables in `themes/nextorbital/static/css/main.css`:

```css
:root {
  --color-bg-primary: #09090b;
  --color-accent: #22d3ee;
  /* ... */
}
```

### Fonts

Update the Google Fonts import in `themes/nextorbital/layouts/partials/head.html`.

## License

MIT License

