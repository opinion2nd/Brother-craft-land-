# Brother Craft Land - Minecraft Server Platform

This is a premium, full-stack website for the Brother Craft Land Minecraft Server.

## Features
- Full Store (Ranks & Crates)
- User Authentication & Dashboard (Firebase)
- Mocked bKash/Nagad Payment checkout integration
- Express Backend for incoming webhooks and API
- Modern Neon Dark UI with animations

## Output Requirements Addressed:

### 1. Database Structure
Stored in Firebase Firestore:
- `users/{userId}` -> Stores `email`, `minecraftUsername`, `rank`, `createdAt`
- `orders/{orderId}` -> Stores `userId`, `productId`, `productType` (rank/crate), `amount`, `status`, `provider` (bKash/Nagad)

### 2. Minecraft webhook Integration Setup
To sync purchases from the Store to the Minecraft Server, use the **Tebex** plugin or a dynamic webhook plugin like **WebSend** or **SpigotWebhooks**.
- The Express Backend has an endpoint specifically built for this: 
  `POST /api/payments/webhook`
- **Flow**:
  1. A user pays via bKash/Nagad checkout.
  2. The payment provider sends a webhook to `POST /api/payments/webhook`.
  3. The `server.ts` handles the webhook, updates the Order in Firestore to `status: completed`.
  4. Node.js uses `rcon-client` (can be added via npm) or an HTTP request to the Minecraft Server to run `lp user [minecraftUsername] parent set [rankId]` to deliver the rank instantly.

### 3. Payment Integration (bKash/Nagad) Setup
Currently, `Checkout.tsx` simulates a network request. To implement real integration:
- **bKash**: Register for the bKash Merchant API. Generate a Token, Create Payment, and Execute Payment inside `server.ts`. Provide the redirect URL back to `/dashboard`.
- **Nagad**: Use the Nagad Gateway SDK. Follow the same flow (initiate payment -> redirect -> callback verification in backend).

### 4. Deployment Guide (GitHub + Render/Vercel)
**Option 1: Vercel / Render** (Recommended since this is Full-stack Node + Vite)
- Go to Render.com -> New Web Service.
- Connect your GitHub Repository.
- Select Node runtime.
- Build Command: `npm install && npm run build`
- Start Command: `npm run start` (Requires setting `NODE_ENV=production`)
- Add Environment Variables (Firebase config, Gateway API Keys).

**Option 2: GitHub Pages (Frontend Only)**
If separating frontend and backend:
1. `npm run build` and deploy the `dist` folder to GitHub Pages.
2. Deploy the Express Server (`server.ts` standalone) to Heroku/Render to handle API routes and Webhooks. Ensure you configure CORS in Express to accept from `yourname.github.io`.
