// src/routes/report.routes.ts
import { Router } from "express";
import { createReportController, deleteReportController, getAllReportsController } from "../controllers/report.controller";

const router = Router();

router.post("/", createReportController);        // Add report
router.delete("/:id", deleteReportController);  // Delete report by ID
router.get("/", getAllReportsController);       // Get all reports

export default router;
