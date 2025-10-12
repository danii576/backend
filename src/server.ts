// src/server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./routes/report.routes";
import newsRoutes from "./routes/news.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/news", newsRoutes);

// Test endpoint
app.get("/api/test", (_req: Request, res: Response) => {
  res.json({ success: true, message: "Server running and DB connected!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
