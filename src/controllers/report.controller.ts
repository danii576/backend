import type { Request, Response } from "express";
import { createReportService, deleteReportService, getAllReportsService } from "../services/report.service";
import type { Report } from "../models/report.model";

// Add a new report
export const createReportController = async (req: Request, res: Response) => {
  try {
    const { year, file_url, admin_id } = req.body as Partial<Report>;

    // Validate required fields
    if (year === undefined || !file_url || admin_id === undefined) {
      return res.status(400).json({ message: "Year, file_url, and admin_id are required" });
    }

    const report: Report = { year, file_url, admin_id };
    const newReport = await createReportService(report);
    res.status(201).json(newReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create report" });
  }
};

// Delete a report
export const deleteReportController = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (!idParam) {
      return res.status(400).json({ message: "Report ID is required" });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Report ID must be a number" });
    }

    const success = await deleteReportService(id);
    if (success) {
      res.status(200).json({ message: "Report deleted successfully" });
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete report" });
  }
};

// Get all reports
export const getAllReportsController = async (_req: Request, res: Response) => {
  try {
    const reports = await getAllReportsService();
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};
