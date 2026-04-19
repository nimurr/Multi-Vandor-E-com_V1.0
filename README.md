# Multi-Vendor SaaS E-commerce Platform

## Setup
1. Copy .env.example to .env, fill values (MongoDB Atlas/local, Stripe/SSLCommerz).
2. Backend: cd server && npm install && npm run dev
3. Frontends: cd landing_Page/vendor/admin/vandor_website && npm install && npm run dev (ports 5173+)
4. Admin user: Register first vendor as admin or seed.

## Run (Dev)
**Single command:**
```
npm run dev
```
(backend/frontends concurrent)

**Production (Nginx single cmd proxy):**
1. `winget install Nginx.Nginx`
2. `npm run dev` (background or pm2)
3. New terminal: `nginx -c nginx.conf`

Access localhost (proxies all: /api→backend, /vendor→dash, /store→site, /→landing).
Dynamic domains via server middleware.

Test: localhost/register.


## Features Implemented per TODO.md

