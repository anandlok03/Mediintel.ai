# MediIntel Solutions Private Limited — "Smart Healthcare Intelligence"

MediIntel Solutions is a modern, premium full-stack enterprise healthcare software application built to streamline operations, statutory inspections, and quality audits within clinical institutions. 

This repository implements a high-fidelity single-page SaaS landing profile augmented with a fully interactive **Operations Dashboard Replica** and an integrated, real-working **Generative AI Compliance Advisor** that utilizes Google Gemini models secure API.

---

## 🎨 Design Philosophy & Aesthetic Core
- **Healthcare Theme**: Sophisticated White + Blue + Teal dynamic contrast giving an premium, trustworthy biotech developer structure.
- **Micro-Animations**: Staggered interactive checkpoints, subtle progress indicator calculations, pulsing live-feed signals, and smooth dialog transitions.
- **Glassmorphism**: Backdrop blur overlays for header sheets (`backdrop-filter`) keeping sections fluid and light.
- **Responsive Adaptability**: Fully optimized for handheld mobiles, tablets, and wide-screen desktop panels.

---

## 📁 Developed Folder Hierarchy
```text
/
├── .env.example              <- Template configuration representing secret parameters (GEMINI_API_KEY)
├── index.html                <- Main web page header housing SEO meta descriptors, viewport configuration
├── package.json              <- Full-stack server packages, esbuild compilers, and TS scripts
├── server.ts                 <- Express Full-stack endpoint layer managing API proxies and Vite dev server
├── vite.config.ts            <- Tailwind CSS Integration rules and Vite bundling rules
├── tsconfig.json             <- Strict TS modules compilation scopes
│
└── src/
    ├── main.tsx              <- Frontend bundle setup point
    ├── index.css             <- Tailwind CSS v4 directives, custom web-fonts (Plus Jakarta Sans, Space Grotesk)
    ├── App.tsx               <- Central state orchestrator connecting sections and modals
    ├── types.ts              <- Unified strict TypeScript interface records
    │
    └── components/
        ├── Navbar.tsx        <- Blur-backdrop header layout, responsive mobile drawers, and text typography logo
        ├── Hero.tsx          <- Interactive indicators, clinical statistics grid, and major call-to-actions
        ├── About.tsx         <- Highlighting core corporate mission modules, replacements for manual folders
        ├── Services.tsx      <- Specialized applet configuration grids
        ├── Features.tsx      <- System security profiles supporting HIPAA, ISO, and TLS mandates
        ├── DashboardPreview.tsx <- Dynamic twin system, dynamic scoring checklist, and real-working AI compliance sandbox
        ├── WhyChooseUs.tsx   <- Strategic financial returns (claim deduction metrics details)
        ├── Industries.tsx   <- Target client segments (IVF care, multispecialty, diagnostics labs)
        ├── Testimonials.tsx  <- Real-world simulated superintendents and directors reviews
        ├── Contact.tsx       <- Multi-input client inquiry register, WhatsApp CTAs, and success feedback
        └── BookDemoModal.tsx <- Interactive 2-phase clinical walkthrough schedule calendar
```

---

## ⚙️ Direct Local Installation Setup

To test, deploy, and inspect this application within any workspace, execute the following actions:

### 1. Synchronize Dependencies
Install the compiled node dependencies requested inside the bundle:
```bash
npm install
```

### 2. Configure Your Secure Keys
Generate your environmental file or inject the key under the platform Secrets manager:
```env
# .env
GEMINI_API_KEY="AI_STUDIO_INJECTED_OR_YOUR_OWN_SEC_KEY"
PORT=3000
```

### 3. Initiate the Dev server
Boot the Express + Vite proxy stack concurrently on port 3000:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser.

### 4. Code compilation checks
Verify TypeScript lint consistency and syntax parameters:
```bash
npm run lint
```

---

## 🚀 Deployment Steps (Vercel)

Deploying a full-stack Node.js + React environment on Vercel is extremely straightforward using corporate Serverless Functions.

### Step 1: Install Vercel CLI
If you prefer terminal-driven deploys:
```bash
npm install -g vercel
```

### Step 2: Establish the Serverless Function Map
Add a `vercel.json` descriptor at the project root folder to route api requests through the Serverless environment:
```json
{
  "version": 2,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/dist/$1" }
  ]
}
```

### Step 3: Run deploying commands
Connect your workspace, configure your online environment secrets dashboard to include `GEMINI_API_KEY`, and trigger:
```bash
vercel --prod
```

---

## 🔐 Compliance & Technical Safeguards
- **Data Isolation**: Multi-tenant database blueprints prevent cross-sharing.
- **HIPAA Compliance**: System stores no protected patient healthcare information (PHI) within standard landing stages.
- **TLS 1.3 & AES-256**: All API communications between servers and clients are encrypted securely.
