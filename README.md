# Procura — AI-Powered Procurement and Supplier Management Platform

**Procura** is a modern, high-fidelity enterprise SaaS web application engineered for centralized corporate purchasing, supplier relationship management, competitive quotation analysis, sealed double-blind anonymous vendor bidding, multi-tier approvals, purchase orders, and real-time procurement analytics.

---

## 🌟 Key Capabilities & Highlights

1. **Role-Based Perspectives & User Classes:**
   - 🏢 **Organization Administrator:** Full system governance, all modules, global analytics, DOFP threshold configuration, and user permissions.
   - 📋 **Procurement Officer:** Requisition routing, tender drafting & publication, vendor invitations, bid monitoring, commercial PO preparation.
   - ⚖️ **Approver / Evaluation Committee:** Hierarchical authorization, business justification sign-offs, double-blind anonymous bid evaluation, technical/financial scoring.
   - 🏭 **Vendor / Supplier:** Separate Vendor Portal (`/vendor/dashboard`), tender browsing, sealed bid submissions (generating anonymous tokens), and confidential bid tracking.
   - ⚡ **Instant Demo Role Switcher:** Switch between all 4 institutional roles in 1 click from the Topbar or the `/login` screen without needing passwords or backend authentication.

2. **Sealed Double-Blind Anonymous Bidding Protocol:**
   - In compliance with institutional procurement standards, all submitted vendor bids are assigned an obfuscated token (e.g. `BIDDER-7041`).
   - Evaluation screens show **Bidder IDs instead of company names** to prevent bias during technical and financial evaluation.
   - Vendors strictly only see their own bids; competitor proposals and pricing remain sealed.
   - **Restricted Identity Disclosure:** Disclosure is restricted to authorized committee officers, strictly requires a documented business justification, and logs the user, timestamp, IP, and reason into an indelible audit trail.
   - The system preserves human oversight; the evaluation committee retains final decision authority without automated winner selection.

3. **Centralized Data & Clean Service Layer (`src/services/`):**
   - Centralized dummy data in `src/data/` (`users.js`, `tenders.js`, `bids.js`, `requisitions.js`, `suppliers.js`, `purchaseOrders.js`, `approvals.js`, `notifications.js`).
   - Dedicated service layer (`tenderService.js`, `bidService.js`, `requisitionService.js`, `supplierService.js`, `purchaseOrderService.js`, `approvalService.js`, `notificationService.js`, `storageService.js`) wrapping localStorage persistence.
   - Clean separation of UI components from data access, making future database and API integration straightforward.

4. **14 Implemented Application Pages:**
   - **Page 1: Login & Role Selection** (`/login`)
   - **Page 2: Procurement Dashboard** (`/dashboard`)
   - **Page 3: Requisitions Management** (`/requisitions`)
   - **Page 4: Create Requisition** (`/requisitions/create`)
   - **Page 5: Tender Management** (`/tenders`)
   - **Page 6: Vendor Portal & Bidding** (`/vendor/dashboard`, `/vendor/tenders`, `/vendor/tenders/:id/submit-bid`, `/vendor/my-bids`)
   - **Page 7: Anonymous Bid Evaluation** (`/tenders/:id/evaluation`)
   - **Page 8: Quotation Comparison & AI Recommendations** (`/quotations`)
   - **Page 9: Supplier Directory & Management** (`/suppliers`)
   - **Page 10: Purchase Order Management** (`/purchase-orders`)
   - **Page 11: Approval Center** (`/approvals`)
   - **Page 12: Procurement Analytics** (`/analytics`)
   - **Page 13: Notification Center** (`/notifications`)
   - **Page 14: Settings & Data Reset** (`/settings`)

---

## 🛠️ Technology Stack

- **React.js 18** (Modern functional components, hooks, Context API)
- **Vite 6** (Blazing-fast build tool and dev server)
- **JavaScript (ES Modules)**
- **Tailwind CSS 3** (Custom design tokens, enterprise palette, responsive grid)
- **React Router DOM 6** (Declarative SPA routing with nested layouts)
- **Lucide React** (Clean, consistent enterprise iconography)
- **Recharts 2** (Interactive SVG data visualizations and spending trends)
- **React Hook Form** (Form state handling & dynamic inputs)
- **Playwright & pdf-lib** (High-fidelity 16:9 PDF generator)

---

## 📦 Setup & Execution Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
```
Builds the production-ready distribution into the `dist/` directory.

### 4. Production Preview
```bash
npm run preview
```
Serves the production build locally at `http://localhost:4173`.

### 5. Generate High-Fidelity 16:9 Design PDF
```bash
npm run pdf
```
Runs the automated Playwright capture script and compiles the screens into `Procura_High_Fidelity_Design.pdf` in the project root.

---

## ☁️ Vercel Deployment Readiness

The project is fully pre-configured for zero-configuration deployment to **Vercel**:
- Includes `vercel.json` configured with SPA rewrites (`"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`) so direct navigation and nested page refreshes work seamlessly.
- Built strictly with Vite's standard production output: `dist`.
- Zero local absolute filesystem paths.
- No backend, API keys, or external database credentials required; works instantly with built-in client-side mock services and localStorage.

---

## 🔒 Notes on Implementation & Future Backend Integration

This phase is focused strictly on the **frontend experience and architecture**:
- **Authentication & RBAC:** Role switching is currently simulated on the frontend via React state and localStorage. Real JWT/OAuth session management and server-enforced role authorization will be attached to the service layer in the backend phase.
- **Anonymity & Cryptographic Security:** The double-blind anonymous evaluation interface demonstrates proper tokenization (`BIDDER-XXXX`), masked vendor details, and audit logging. In the production backend phase, cryptographic envelope encryption and database-level row-level security (RLS) will be implemented to prevent server-side data leaks.
- **AI Recommendation Engine:** The quotation comparison highlights heuristic multi-attribute trade-offs (price vs lead time vs SLA vs warranty) using deterministic rules based on the sample dataset.

---

## 📁 Repository

- **GitHub:** `https://github.com/sabbir-404/procura`
- **Owner:** `sabbir-404`
