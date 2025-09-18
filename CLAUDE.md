Pet insurance web application monorepo.

# Folder structure

- apps
  - frontend (React with Next.js)
  - backend (C# .NET API)

# Project Stack

## Frontend

### Framework

React with Next.js using the app router.

### Types

TypeScript, with strict configuration

### Styling

Tailwind

### Component library

shadcn/UI for pre-built accessible components.

### Package management

Bun

### Testing

Playwright for end-to-end/UI testing. Vitest for component development and testing.

### Schema validation

Zod for runtime schema validation and derived types.

### Component library

## Backend

### Framework

C# .NET

### Database

SQL Server running in a Docker container.

### API

REST API using Web API

### CQRS

MediatR

### ORM

Entity Framework DB-first

## Monorepo Management

Turborepo for build orchestration and task running.

## Hosting/Infrastructure

Azure with Kubernetes.

## Authentication

Okta for B2B integrations and Entra ID for internal access.
