import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import reportRoutes from "./routes/report.routes.js";

dotenv.config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await initDB(); // Initialize database connection

    // Mount routes
    app.use("/admin", adminRoutes);
    app.use("/api/reports", reportRoutes);

    // Test route
    app.get("/api/test-db", (_req, res) => {
      res.json({ success: true, message: "Server running and DB connected!" });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  } catch (err: any) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
