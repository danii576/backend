import express from "express";
import adminRoutes from "./routes/admin.routes";
import reportRoutes from "./routes/report.routes";

const app = express();
app.use(express.json());

// Admin routes
app.use("/admin", adminRoutes);

// Reports
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
