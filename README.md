# 🚀 POSTMAN (PrismaPulseAPI) - Modern API Development Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-green?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)

**A powerful, feature-rich API client and testing platform built with modern web technologies. Designed to be a robust alternative to tools like Postman.**

[Features](#-key-features) • [Tech Stack](#-technology-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Documentation](#-documentation)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Postman-1** is a sophisticated API development platform that enables developers to duplicate the core functionality of Postman directly in the browser. Built with modern web technologies and enterprise-grade patterns, this project demonstrates proficiency in full-stack development, complex state management, and scalable architecture design.

### Why This Project Stands Out

- **Production-Ready Architecture**: Implements industry best practices including Server Actions for backend logic, Prisma for type-safe database access, and strictly typed forms.
- **Advanced Request Editor**: Features a fully functional code editor (Monaco Editor) for request bodies and response viewing.
- **Enterprise Authentication**: Implements Better Auth with support for multiple OAuth providers (GitHub, Google) and email/password authentication.
- **AI-Powered Assistance**: Integrates Google Gemini for intelligent request generation and response analysis.
- **Organization & Collaboration**: Full support for Workspaces, Collections, and Environments to manage API workflows effectively.
- **Modern UI/UX**: Built with Shadcn UI primitives and Tailwind CSS v4 for a seamless, accessible user experience.
- **Type-Safe End-to-End**: Full TypeScript implementation with strict typing across frontend, backend, and database layers.

---

## ✨ Key Features

### 🌐 Comprehensive HTTP Support

- **Full Method Support**: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS.
- **Dynamic Request Builder**: URL support, query params, headers, and body management.
- **Response Visualization**: Detailed view of status, time, size, headers, and body.

### 📝 Advanced Editors

- **Monaco Editor Integration**: Professional-grade code editing for JSON/XML bodies.
- **Syntax Highlighting**: Auto-detection of content types.
- **Linting & Validation**: Real-time error checking for JSON inputs.

### 🔐 Robust Authentication System

- **Multi-Provider OAuth**: GitHub and Google social authentication.
- **Email/Password Authentication**: Secure credential-based authentication with Better Auth.
- **Session Management**: Secure session handling with HTTP-only cookies.
- **RBAC**: Role-based access control (Owner, Admin, Member) for workspaces.

### 📂 Organization & Workflow

- **Workspaces**: Isolate projects and teams in distinct workspaces.
- **Collections**: Group requests logically with hierarchical structure.
- **Environment Variables**: Manage keys and variables across dev/staging/prod environments.
- **Request History**: Track and re-run previous requests easily.

### 🤖 AI Integration

- **Intelligent Helpers**: Use Google Gemini to generate request bodies or explain error responses.
- **Context Awareness**: AI commands that understand the current request context.

### ⚡ Performance & Data

- **Optimistic Updates**: Immediate UI feedback using TanStack Query.
- **Server Actions**: Efficient data mutation without API route overhead.
- **PostgreSQL Database**: Relational data storage with Prisma ORM.

---

## 🛠️ Technology Stack

### Frontend

| Technology          | Purpose                         | Version |
| ------------------- | ------------------------------- | ------- |
| **Next.js**         | React framework with App Router | 15.5.7  |
| **React**           | UI library                      | 19.1.0  |
| **TypeScript**      | Type-safe development           | 5.x     |
| **Tailwind CSS**    | Utility-first styling           | 4.x     |
| **Shadcn/Radix UI** | Accessible component primitives | Latest  |
| **Monaco Editor**   | Code editing                    | 4.7.0   |
| **Zustand**         | Client state management         | 5.0.9   |
| **TanStack Query**  | Server state management         | 5.90.12 |
| **React Hook Form** | Form management                 | 7.68.0  |
| **Zod**             | Schema validation               | 4.1.13  |
| **Framer Motion**   | Animations                      | 12.23.2 |
| **Lucide React**    | Icon library                    | 0.556.0 |

### Backend

| Technology      | Purpose                  | Version  |
| --------------- | ------------------------ | -------- |
| **Next.js**     | Server Actions/API       | 15.5.7   |
| **Prisma**      | ORM and database toolkit | 6.19.0   |
| **PostgreSQL**  | Relational database      | 18-alpha |
| **Better Auth** | Authentication framework | 1.4.6    |
| **Axios**       | HTTP Client Proxy        | 1.13.2   |

### AI & Integration

| Technology        | Purpose                  | Version |
| ----------------- | ------------------------ | ------- |
| **Google AI SDK** | Gemini model integration | Latest  |

### DevOps & Tooling

| Technology       | Purpose              | Version |
| ---------------- | -------------------- | ------- |
| **Docker**       | Containerization     | Latest  |

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Client Components (React 19)             │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐     │  │
│  │  │  Monaco  │  │ Request  │  │   Response       │     │  │
│  │  │  Editor  │  │ Builder  │  │   Viewer         │     │  │
│  │  └──────────┘  └──────────┘  └──────────────────┘     │  │
│  └───────────────────────────────────────────────────────┘  │
│                            ↕                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │             Server Actions & API Routes               │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐     │  │
│  │  │   Auth   │  │  Proxy   │  │   Database       │     │  │
│  │  │  Logic   │  │  Service │  │   Layer          │     │  │
│  │  └──────────┘  └──────────┘  └──────────────────┘     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    External Services                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Postgres │  │  Target  │  │  Google  │  │  OAuth   │     │
│  │   DB     │  │   APIs   │  │  Gemini  │  │ Providers│     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns

1.  **Feature-Based Structure**: Organized by domain features (request, collection, workspace, auth).
2.  **Server/Client Separation**: Leveraging React Server Components (RSC) where possible, and Client Components for interactivity.
3.  **Proxy Pattern**: Using Next.js API routes/Server Actions as a proxy to avoid CORS issues when making requests to third-party APIs.
4.  **Optimistic Updates**: React Query mutations to instantly update the UI before server confirmation.
5.  **Global Store**: Zustand for complex client-side state like the current active request tab.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **Docker** & Docker Compose (for PostgreSQL)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/asayushranjansinha/postman.git
   cd postman
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env from example
   cp .env.local .env
   ```

   Edit `.env` with your configuration (see [Environment Variables](#-environment-variables)).

4. **Set up the database**

   ```bash
   # Start PostgreSQL Container
   docker compose up -d

   # Push Schema to DB
   npx prisma db push

   # Or run migrations
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Database

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

### Authentication (Better Auth)

```env
BETTER_AUTH_SECRET="your_generated_secret_key"
BETTER_AUTH_URL="http://localhost:3000"
```

### OAuth Providers

```env
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### AI Providers

```env
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"
```

### Frontend

```env
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

---

## 🗄️ Database Schema

### Core Models

- **User**: Authentication and profile info.
- **Workspace**: The top-level container for projects.
- **Collection**: Folders to organize requests within a workspace.
- **Request**: The actual HTTP request definitions (URL, Method, Body).
- **Environment**: Global variables (key-value pairs) for workspaces.
- **RequestRun**: History of executed requests and their responses.

### Entity Relationship Overview

```
User ──┬── Workspaces ──┬── Collections ──── Requests ──── Runs
       │                └── Environments ─── Variables
       ├── Sessions
       └── Accounts
```

---

## 💻 Development

### Available Scripts

| Script                | Description                                 |
| :-------------------- | :------------------------------------------ |
| `npm run dev`         | Starts the development server and Docker DB |
| `npm run build`       | Builds the application for production       |
| `npm run start`       | Starts the production server                |
| `npm run use:dev`     | Copies `.env.local` to `.env`               |
| `npm run use:prod`    | Copies `.env.prod` to `.env`                |
| `npm run postinstall` | Generates the Prisma Client                 |

### Development Workflow

1.  **Feature Development**: Work in `src/features/` (e.g., `src/features/request/`).
2.  **Database Changes**:
    - Modify `prisma/schema.prisma`.
    - Run `npx prisma migrate dev --name <migration_name>`.
3.  **UI Components**: Use `src/components/ui/` for primitive components.
4.  **Type Safety**: Ensure strict typing for all props and server actions.

---

## 🌐 Deployment

### Vercel (Recommended)

1.  **Push to GitHub**
    ```bash
    git push origin main
    ```
2.  **Deploy to Vercel**
    - Connect your repository.
    - Set Environment Variables in Vercel Dashboard.
    - Deploy.

### Database Migration

During build/deploy, ensure Prisma Client is generated:

```bash
npx prisma generate
```

---

## 📁 Project Structure

```
postman-1/
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (authentication)/
│   │   ├── (dashboard)/
│   │   └── api/
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature-based logic
│   │   ├── authentication/
│   │   ├── collection/
│   │   ├── request/
│   │   └── workspace/
│   ├── hooks/            # Global React hooks
│   ├── lib/              # Core libraries (auth, db, env)
│   ├── types/            # TypeScript definitions
│   └── utils/            # Helper functions
├── .env                  # active env file
├── docker-compose.yml    # Database container config
├── next.config.ts        # Next.js config
└── package.json          # Dependencies
```

---

## 🎓 What This Project Demonstrates

### Technical Skills

✅ **Full-Stack Development**: Complex frontend state combined with robust backend logic.  
✅ **Type Safety**: End-to-end Zod validation and TypeScript integration.  
✅ **Authentication**: Secure implementation of modern auth standards.  
✅ **Database Design**: Relational modeling for complex project structures.  
✅ **API Proxying**: Handling CORS and secure request dispatching server-side.  
✅ **State Management**: Managing transient (UI) and persistent (Server) state efficiently.

### Software Engineering Principles

✅ **Component-Driven Design**: Reusable, isolated UI components.  
✅ **Separation of Concerns**: distinct feature folders for scalability.  
✅ **Clean Code**: Consistent formatting and linting rules.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 Contact

**Ayush Ranjan Sinha**

- GitHub: [@asayushranjansinha](https://github.com/asayushranjansinha)
- LinkedIn: [Ayush Ranjan Sinha](https://linkedin.com/in/asayushranjansinha)
- Email: asayushranjansinha@gmail.com

---

**⭐ Star this repository if you found it helpful!**
