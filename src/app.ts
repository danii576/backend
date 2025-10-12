import express from "express";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.routes";
import newsRoutes from "./routes/news.routes";
import reportRoutes from "./routes/report.routes";
import { authMiddleware } from "./middlewares/auth.middleware";

dotenv.config();
const app = express();
app.use(express.json());

// Public routes
app.use("/api/admin", adminRoutes);

// Protected routes — admin must be logged in
app.use("/api/news", authMiddleware, newsRoutes);
app.use("/api/reports", authMiddleware, reportRoutes);

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
