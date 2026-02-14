# Nifty AI Meeting Analyzer

> Turn meeting transcripts into actionable outcomes—AI-generated tasks, a searchable knowledge base, and clear visibility into decisions and follow-ups.

## Overview

Nifty AI Meeting Analyzer is a React single-page application (SPA) that connects to a remote backend API to process meeting transcripts from Zoom and other sources. The app extracts action items, assigns owners, and syncs tasks to ClickUp—helping teams turn conversations into structured work without extra admin.

## Features

- **Meeting Processing** — Upload transcript files or select from existing recordings; AI analyzes content to extract tasks, assignees, and deadlines
- **Task Management** — View AI-generated tasks grouped by meeting and assignee, with transcript snippet highlighting for context
- **Knowledge Base** — Upload project documentation (PDF/TXT) to improve AI project matching via Pinecone semantic search
- **ClickUp Integration** — Configure API credentials and sync tasks to your ClickUp workspace hierarchy
- **Meeting History** — Browse and search past meeting transcripts
- **Settings & Data Management** — Configure integrations and manage stored data (meetings, logs, tasks, Pinecone context)

## Tech Stack

| Category      | Technology                              |
| ------------- | --------------------------------------- |
| Framework     | React 19, TypeScript                    |
| Build         | Vite 7                                  |
| State         | Redux Toolkit, RTK Query, Redux Persist |
| Styling       | Tailwind CSS 4                          |
| UI Components | Radix UI, shadcn/ui                     |
| Routing       | React Router 7                          |
| HTTP          | Axios                                   |

## Prerequisites

- Node.js 18+
- npm or pnpm

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd qa-test-nifty-it-solution

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the project root (see `.env.example`):

```env
# API Configuration
VITE_API_BASE_URL=https://meet.hub.niftyai.net/api
VITE_API_KEY=your_api_key_here
```

| Variable            | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL (default: `http://localhost:5001/api`) |
| `VITE_API_KEY`      | Optional API key for authenticated access                   |

## Usage

```bash
# Development server (http://localhost:5004)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Route-level pages
├── store/           # Redux store, slices, RTK Query APIs
├── services/        # Axios API client and endpoints
├── utils/           # Transcript parsing, highlighting
└── lib/             # Shared utilities
```

## Key Routes

| Route             | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `/`               | Landing page                                                   |
| `/signin`         | Authentication                                                 |
| `/dashboard`      | Three-step workflow (upload → project → destination → analyze) |
| `/tasks`          | AI-generated tasks by meeting                                  |
| `/history`        | Meeting transcripts                                            |
| `/knowledge-base` | Document upload and management                                 |
| `/settings`       | ClickUp config, data management                                |

## API Integration

The frontend communicates with the backend at `VITE_API_BASE_URL`. Authentication uses JWT tokens stored in `localStorage`. Key API domains:

- **Auth** — Login
- **Recordings** — Upload, list, analyze
- **Meetings** — Status, transcripts
- **Tasks** — List by meeting
- **Knowledge Base** — Upload, list, delete documents
- **Settings** — ClickUp config, data deletion

## License

Proprietary. © Nifty Ai.
