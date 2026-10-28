# AICTE ONEVIEW — Unified Complaint Monitoring & Overlap Detection System

<div align="center">

![AICTE Emblem](./public/aicte-logo.png)

**National Institutional Complaint Surveillance Directorate (IICMSD Subsystem)**  
*Next-generation regulatory intelligence, multi-signal AI claim matching, and cross-bureau coordination for technical education governance in India.*

[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deploy to GitHub Pages](https://github.com/rounit-k-verma/AICTE-complaint-monitoring-system/actions/workflows/deploy.yml/badge.svg)](https://github.com/rounit-k-verma/AICTE-complaint-monitoring-system/actions/workflows/deploy.yml)

🌐 **Live Demo:** [https://rounit-k-verma.github.io/AICTE-complaint-monitoring-system/](https://rounit-k-verma.github.io/AICTE-complaint-monitoring-system/)

</div>

---

## 📌 Executive Summary

Under the statutory mandate of the **AICTE Act 1987 (Sections 10(k) and 10(p))**, thousands of petitions, faculty grievances, student appeals, and whistleblower depositions are submitted annually across multiple specialized AICTE directorates:

- **PGRC** — Public Grievance Redressal Cell
- **RB** — Regulation Bureau
- **AB** — Approval Bureau
- **PAPC** — Policy & Academic Planning Bureau
- **VIGILANCE** — Chief Vigilance Office

Historically, these bureaus operated in administrative silos. Disgruntled parties, predatory contractors, or corrupt institutions frequently exploited these silos by filing fragmented or duplicate complaints across bureaus to delay inquiries, game legal proceedings, or cause contradictory findings.

**AICTE ONEVIEW** resolves this by introducing a **Multi-Signal AI Overlap Detection Engine** that continuously scans incoming complaint dockets, runs semantic NLP embeddings and institutional entity resolution, and unifies cross-bureau actions into a consolidated, tamper-evident **Coordination Workspace**.

---

## 🚀 Key Modules & Capabilities

### 1. 🔍 Multi-Signal AI Overlap Detection Engine
- **Hybrid Similarity Pipeline:**
  - **Exact Identifier Match (1.0 weight):** Deterministic matching on AICTE Permanent Institute IDs (e.g., `AICTE-DEMO-1024`) and AISHE codes.
  - **Fuzzy Token Sort Match (90% threshold):** Matches variations of institution names, campus addresses, and affiliated trust entities.
  - **Semantic Cosine Similarity (85% threshold):** Evaluates vector embeddings of petition narrative texts, allegations, and whistleblower claims.
  - **Temporal Correlation Window (30-day sliding window):** Identifies coordinated filing sprees across bureaus.
- **Side-by-Side Docket Inspector:** Dual-column view comparing Docket A and Docket B with highlighted text excerpts, evidence file hashes (SHA-256), and automated AI synthesis.
- **Officer Adjudication:** Bureau officers can confirm or dismiss matches, write joint surveillance notes, and notify respective case officers in real-time.

### 2. 🤝 Cross-Bureau Coordination Workspace
- **Joint Case Management:** Dedicated inter-bureau working rooms (e.g., `#GRP-088: North Valley Financial & Academic Malpractice Joint Inquiry`).
- **Statutory Sovereignty Preservation:** Each bureau retains legal jurisdiction while collaborating on shared facts.
- **Collaborative Action Checklist:** Track joint surprise inspections, escrow account freezes, and statutory hearings.
- **Permanent Evidentiary Audit Feed:** Immutable chronological log of officer findings, timestamped and attributed.

### 3. 🏢 360° Institutional Directory & Surveillance Dossiers
- Comprehensive surveillance cards for approved institutes across Northern, Western, Southern, Eastern, and Central regions.
- Key metrics: **Compliance Score**, **Recidivism Risk Index** (Critical / High / Moderate / Low), active and historical dockets, accreditation status (NBA/NAAC), and faculty/student enrollment.
- Instant drill-down into every past grievance associated with an institution.

### 4. 📋 Central Grievance & Complaint Register
- Searchable and filterable master register for all petitions and whistleblower submissions.
- Filter by Bureau, Severity Level (Critical, High, Medium, Low), Status, and SLA Breached / Near Breach timers.
- Integrated modal to **Log New Grievance** with instant automated background overlap scanning.

### 5. 🔔 Statutory Alerts & Telemetry Dispatch
- Priority notification center alerting officers of:
  - High-confidence overlap triggers ($\ge 90\%$)
  - SLA breach warnings (< 5 days remaining)
  - Regional surprise inspection notices and forensic audit reports.

### 6. 📊 Regulatory Intelligence & Analytics
- Bi-annual gazette audit dashboards.
- Bureau workload distribution, resolution throughput, and fraud-ring recidivism matrices.
- One-click export simulation for official AICTE Gazette reports.

### 7. 🔐 NIC Access Control & HSM Security
- Multi-bureau user directory with role-based access control (RBAC).
- Simulates FIPS 140-2 Level 3 hardware security module (HSM) badge credentials and 256-bit cryptographic validation.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) with custom AICTE color tokens |
| **Typography** | Google Fonts (*Montserrat*, *Inter*, *JetBrains Mono*, *Material Symbols Outlined*) |
| **Icons & Motion** | `lucide-react`, `motion` |
| **AI Integration** | Google GenAI SDK (`@google/genai`) ready |
| **CI/CD & Hosting** | GitHub Actions + GitHub Pages |

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version **20.x** or later recommended)
- `npm` (version **10.x** or later)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rounit-k-verma/AICTE-complaint-monitoring-system.git
   cd AICTE-complaint-monitoring-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API key if you wish to enable live AI synthesis calls:
   ```env
   GEMINI_API_KEY="your-gemini-api-key"
   APP_URL="http://localhost:3000"
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 📦 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with HMR on port 3000 |
| `npm run build` | Compiles TypeScript and creates an optimized production bundle in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checking without emitting files |
| `npm run deploy` | Deploys the `dist/` folder directly to GitHub Pages via `gh-pages` |

---

## 🌐 Deployment to GitHub Pages

This project is configured for automated continuous deployment using **GitHub Actions**.

### Automated Deployment (GitHub Actions)
1. Push any commit to the `main` branch.
2. In your repository on GitHub, navigate to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, choose **GitHub Actions**.
4. The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) will automatically build and publish the site.

### Manual Deployment (gh-pages)
You can also trigger a manual deployment anytime directly from your terminal:
```bash
npm run deploy
```

---

## 📁 Repository Structure

```
AICTE-complaint-monitoring-system/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions Pages deployment pipeline
├── public/
│   ├── aicte-logo.png              # AICTE official emblem asset
│   └── assets/                     # Supporting mockups & UI design assets
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Global navigation bar & live search
│   │   ├── Sidebar.tsx             # Collapsible primary drawer
│   │   ├── LogGrievanceModal.tsx   # Docket intake modal with overlap scan
│   │   └── views/
│   │       ├── DashboardView.tsx               # Surveillance dashboard
│   │       ├── OverlapDetectionView.tsx        # Multi-signal AI matching engine
│   │       ├── CoordinationWorkspaceView.tsx   # Cross-bureau joint inquiry room
│   │       ├── ComplaintManagementView.tsx     # Master docket registry
│   │       ├── InstitutionDirectoryView.tsx    # 360° institutional profiles
│   │       ├── AlertsNotificationsView.tsx     # Statutory notification center
│   │       ├── ReportsAnalyticsView.tsx        # Regulatory intelligence & gazette
│   │       └── UserManagementView.tsx          # NIC / HSM access control
│   ├── data/
│   │   └── mockData.ts             # Rich seed dataset with real-world scenarios
│   ├── App.tsx                     # Main layout & view router
│   ├── index.css                   # Tailwind v4 theme & token definitions
│   ├── main.tsx                    # Application entry point
│   └── types.ts                    # TypeScript domain models & schemas
├── .env.example                    # Environment variable template
├── .gitignore                      # Git ignore rules
├── index.html                      # HTML template with Google Fonts
├── metadata.json                   # AI Studio app manifest
├── package.json                    # Project metadata & npm dependencies
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite bundler config with relative base
```

---

## 🏛️ Statutory Compliance Note

> **Disclaimer:** This prototype is designed as an architectural proof of concept for the **AICTE ONEVIEW / IICMSD** platform. All institutional names, complaint narratives, and officer profiles in the mock dataset are simulated for demonstration purposes under AICTE Act guidelines.

---

## 👥 Contributors & Acknowledgements

- **Author:** Rounit K. Verma ([@rounit-k-verma](https://github.com/rounit-k-verma))
- **Organization:** All India Council for Technical Education (AICTE) Initiative Prototype
- Built with Google AI Studio & Google Antigravity IDE.
