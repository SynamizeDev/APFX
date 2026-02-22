# APFX — Institutional-Grade Trading Platform

Welcome to the APFX project. This is a high-performance, premium finance platform following an institutional aesthetic and world-class engineering standards.

---

## 🚀 Quick Start with Antigravity

If you are using the Antigravity AI agent, you can set up the entire project with a single prompt.

**Prompt to Antigravity:**
> "Hey Antigravity, please set up the whole project. Install all dependencies for the monorepo, both frontend and backend, and ensure the environment variables are correctly initialized from the examples."

---

## 🛠️ Manual Setup Process

Follow these steps to get the project running on your local machine.

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v10.x or higher
- **Turborepo**: (Installed via npm)

### 2. Install Dependencies
From the root directory, run:
```bash
npm install
```
This will install dependencies for the root, `/frontend`, and `/backend` using Turborepo workspaces.

### 3. Environment Configuration
Copy the `.env.example` files to `.env` in both the frontend and backend directories:

**Frontend:**
```bash
cp frontend/.env.example frontend/.env
```

**Backend:**
```bash
cp backend/.env.example backend/.env
```

*Note: Update the values in `.env` with your actual API keys and configuration.*

### 4. Running the Project
To start both the frontend and backend in development mode simultaneously:
```bash
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🏗️ Project Structure
- **/frontend**: Next.js 14 (App Router) with GSAP, Three.js, and Lucide icons.
- **/backend**: Node.js / Express API for lead capture and market data.
- **roadmap.md**: Detailed build plan and tech stack overview.

---

## 💎 Design Standards
This project follows a "Premium Fintech" aesthetic:
- **Obsidian Dark Theme**: Pure blacks and deep navy surfaces.
- **Glassmorphism**: High-intensity blur and subtle borders.
- **Institutional Icons**: Professional iconography via `lucide-react`.
- **Motion Choreography**: GSAP-powered entry and scroll animations.

---

## 🗺️ Roadmap
For the full architectural plan and phase-by-phase timeline, please refer to the [roadmap.md](roadmap.md) file in the root.
