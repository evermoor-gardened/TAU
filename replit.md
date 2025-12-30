# AgentHive

## Overview

AgentHive is a web-based agent workspace and monitoring dashboard. The application displays AI/automation agents with their status information and provides an API console for viewing system logs. Built with Lit web components and styled with Tailwind CSS, it follows a lightweight, component-based architecture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: Lit (Web Components library) for building reactive, encapsulated UI components
- **Build Tool**: Vite for fast development and production builds
- **Styling**: Tailwind CSS via CDN for utility-first styling, with component-scoped CSS using Lit's `css` tagged template literals
- **Icons**: Feather Icons loaded via CDN

**Component Structure**:
- `app-root.ts` - Main application shell, orchestrates child components
- `app-navbar.ts` - Navigation header component
- `agent-card.ts` - Displays individual agent status cards
- `api-console.ts` - Terminal-style log viewer

**State Management**:
- Custom `AgentStore` class extending `EventTarget` for reactive state
- Simple event-based change notification pattern
- Centralized store in `store.ts` managing agents and logs

### Backend Architecture

The project includes configuration for a backend server (referenced in `script/build.ts`):
- **Runtime**: Node.js with Express
- **Build**: esbuild for server bundling with selective dependency bundling for cold start optimization
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between client and server)

### Data Models

**Agent**:
- id, name, status (active/busy/offline), lastActive, avatar

**Log**:
- id, timestamp, level (info/warn/error), source, message

### Database

- **ORM**: Drizzle ORM configured for PostgreSQL
- **Migrations**: Output to `./migrations` directory
- **Connection**: Requires `DATABASE_URL` environment variable

## External Dependencies

### Frontend
- **Lit** (^3.3.2) - Web components framework
- **Tailwind CSS** - Utility CSS framework (CDN)
- **Feather Icons** - Icon library (CDN)

### Backend (Build Configuration)
- **Express** - Web server framework
- **Drizzle ORM** - Database ORM
- **PostgreSQL (pg)** - Database driver
- **Passport** - Authentication middleware
- **OpenAI / Google Generative AI** - AI service integrations
- **Stripe** - Payment processing
- **Nodemailer** - Email sending
- **WebSocket (ws)** - Real-time communication

### Development
- **Vite** (^7.3.0) - Build tool and dev server
- **esbuild** - Server bundling
- **TypeScript** - Type checking (strict mode)

### UI Components (Configured)
- **shadcn/ui** - Component library configuration present (`components.json`) pointing to `client/src` directory with New York style variant