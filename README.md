# Pet Insurance Web Application

A monorepo containing a pet insurance web application with React frontend and .NET backend.

## Project Structure

```
apps/
├── frontend/          # React + Next.js frontend
└── backend/           # .NET Web API backend
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (for frontend package management)
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Docker](https://www.docker.com/) (for SQL Server)

### Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the database:
   ```bash
   docker-compose up -d
   ```

3. Run both applications:
   ```bash
   bun dev
   ```

## Available Scripts

- `bun dev` - Start both frontend and backend in development mode
- `bun build` - Build both applications
- `bun test` - Run tests for both applications
- `bun lint` - Lint all code

## Tech Stack

See [CLAUDE.md](./CLAUDE.md) for detailed technology decisions and project specifications.