# Yousif Ahmed — Software QA Engineer Portfolio

This repository contains Yousif Ahmed's personal portfolio. It presents his QA focus through an interactive 3D skills keyboard, animated project and experience sections, responsive navigation, theme controls, and a contact form.

The current experience and project entries are clearly labeled demo content. They preserve the complete layout and interactions until Yousif's final professional history is added.

## Technology

| Area | Tools |
|---|---|
| Framework | Next.js 16.2.2, React 19.2.4, TypeScript |
| Styling | Tailwind CSS, Radix UI |
| Animation | Motion, GSAP, Lenis |
| 3D | Spline Runtime |
| Email | Resend |
| Optional services | Socket.IO realtime features, Umami analytics |

## Run locally

Install Node.js 20 or later, then run these commands from the project directory in PowerShell:

```powershell
corepack pnpm@9.15.9 install --frozen-lockfile
corepack pnpm@9.15.9 exec next dev --webpack --hostname 127.0.0.1
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

To open the site from a phone on the same Wi-Fi network, start it with:

```powershell
corepack pnpm@9.15.9 exec next dev --webpack --hostname 0.0.0.0
```

Then open `http://<computer-ip-address>:3000` on the phone. Windows Firewall must allow Node.js on the private network.

## Environment variables

Copy `.env.example` to `.env.local` and provide only the services you plan to use.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact form messages through Resend |
| `NEXT_PUBLIC_WS_URL` | Enables optional live cursors, presence, and chat |
| `UMAMI_DOMAIN` | Overrides the default Umami script URL |
| `UMAMI_SITE_ID` | Enables Umami analytics |
| `UMAMI_DEPLOY_SITE_ID` | Records deployment hostnames through `/api/collect` |
| `NEXT_PUBLIC_LEGACY_HOST` | Shows an optional one-time moved-site notice |

The portfolio runs without the optional realtime and analytics variables. Email delivery requires `RESEND_API_KEY`.

## Owner information

Personal information is maintained in `src/data/config.ts`:

- **Name:** Yousif Ahmed
- **Role:** Software QA Engineer
- **Email:** yousif.aldhafari@gmail.com
- **GitHub:** https://github.com/Yousif-Ahmed-Aldhafari
- **LinkedIn:** https://www.linkedin.com/in/yousif-aldh/
- **Instagram:** https://www.instagram.com/the.yalpha/
- **Resume:** https://drive.google.com/file/d/1geI6nRa1D3K3g4H9_Ps98UWjPikge96t/view?usp=drive_link

The GitHub control in the header reads the repository's star count from `/api/github-stars`.

## Content maintenance

| File | Content |
|---|---|
| `src/data/config.ts` | Owner identity, metadata, contact details, and social links |
| `src/data/constants.ts` | Skills and demo work experience |
| `src/data/projects.tsx` | Demo projects, descriptions, links, and technology lists |
| `src/components/header/config.ts` | Header navigation and preview assets |
| `public/assets/` | Images, icons, Spline scenes, and social previews |

Replace entries marked as demo or placeholder with verified information before publishing them as Yousif's professional history. Keep the `SkillNames` enum, `SKILLS` keys, and Spline object names synchronized so the 3D keyboard remains interactive.

## Production build

```powershell
corepack pnpm@9.15.9 exec next build --webpack
corepack pnpm@9.15.9 exec next start
```

Vercel can also build the project directly after the required environment variables are configured.
