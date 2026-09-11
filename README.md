# Sewmini Lakshani — Developer Portfolio

A dark-themed (with light mode toggle) personal portfolio for A.P Sewmini Lakshani, built with HTML5, CSS3, and vanilla JavaScript.

## Folder structure

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg        ← add your real photo here
│   │   ├── projects/          ← add project screenshots here
│   │   └── certificates/      ← add certificate images/PDFs here
│   ├── cv/
│   │   └── Sewmini-Lakshani-CV.pdf   ← your uploaded CV, already in place
│   └── icons/
└── README.md
```

## What's already done

- All content (name, links, projects, certifications, timeline) is pulled from your requirements doc and CV.
- GitHub: github.com/SewminiLakshani, LinkedIn: linkedin.com/in/sewmini-lakshani-1aa691380, Email: sewminilakshani1010@gmail.com.
- "View my CV" and "Download CV" both point to `assets/cv/Sewmini-Lakshani-CV.pdf` (your uploaded resume).
- Dark/light mode with localStorage persistence, sticky navbar with mobile hamburger menu.
- Project cards with JavaScript pagination (3 per page) and a details modal (closes on button, outside click, or Escape).
- Certifications grid with a "View more" reveal for anything beyond the first 6.
- Contact form with JavaScript validation that opens the visitor's email app pre-filled with their message (no backend needed).
- Scroll-reveal animations, respecting `prefers-reduced-motion`.

## To finish before you publish

1. **Profile photo** — the hero currently shows a placeholder monogram ("SL"). Add your real photo to `assets/images/profile.jpg` and swap the `.photo-placeholder` div in `index.html` for an `<img>` tag.
2. **Project screenshots** — each project card currently shows an icon instead of a screenshot. Drop images into `assets/images/projects/` and update the `.project-thumb` markup (or the icon field in `js/script.js`) to use `<img>` tags.
3. **Certificate files** — all "View Certificate" buttons currently point at your CV PDF as a placeholder. Add the real certificate PDFs/images to `assets/images/certificates/` and update the `link` field for each entry in the `CERTIFICATIONS` array in `js/script.js`.
4. **GitHub repo links** — each project's GitHub button currently points to your GitHub profile. Once each project has its own repo, update the `github` field per project in `js/script.js`.

## Running it locally

No build step needed — just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```
npx serve .
```

## Deploying

This is a static site, so it works as-is on GitHub Pages, Netlify, or Vercel — just push the `portfolio/` folder contents to a repo and enable Pages/hosting.
