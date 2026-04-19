import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", server: "Brother Craft Land API" });
  });

  // Example Ping API to get Server Status
  app.get("/api/server/status", async (req, res) => {
    // In a real scenario, use mcsrvstat.us or similar API to ping the Minecraft server
    try {
      const response = await fetch("https://api.mcsrvstat.us/3/play.brothercraftland.net"); // Fictional IP for now
      const data = await response.json();
      
      // Send mock response since IP likely doesn't exist yet
      res.json({
        online: true,
        players: { online: 142, max: 500 },
        motd: { raw: ["§dBrother Craft Land §fSurvival §c& §cPvP"] }
      });
    } catch (e) {
      res.json({ online: false });
    }
  });

  // Mock Payment Webhook (Local/Alternative payment integration)
  app.post("/api/payments/webhook", (req, res) => {
    console.log("Received payment event:", req.body);
    // Ideally this would verify signature, check db, then assign via RCON/Webhook to MC Server
    res.json({ received: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
