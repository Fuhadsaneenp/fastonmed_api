# Fastonmed API

Backend API for the Fastonmed CRM frontend.

## Features

- Express + TypeScript REST API
- JWT login for demo/admin users
- JSON-file persistence for local development
- CRUD routes for CRM modules
- Dashboard summary endpoint
- Zoho Books sync endpoint for contacts and invoices
- Health check endpoint

## Setup

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

Default URL:

```text
http://localhost:4000
```

## Demo Login

```json
{
  "email": "admin@fastonmed.com",
  "password": "admin123"
}
```

## Main Endpoints

```text
GET    /api/health
POST   /api/auth/login
GET    /api/dashboard/summary

GET    /api/clients
POST   /api/clients
GET    /api/clients/:id
PUT    /api/clients/:id
DELETE /api/clients/:id

GET    /api/leads
GET    /api/products
GET    /api/services
GET    /api/maintenance-contracts
GET    /api/tasks
GET    /api/employees
GET    /api/invoices

POST   /api/zoho/sync
```

Set `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, and `ZOHO_ORGANIZATION_ID` in `.env` to sync live Zoho Books contacts and invoices.
