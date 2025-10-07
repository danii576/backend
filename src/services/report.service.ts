// src/services/report.service.ts
import { initDB, RowDataPacket, ResultSetHeader } from "../config/db";
import type { Report } from "../models/report.model";

// Add a new report
export const createReportService = async (report: Report): Promise<Report> => {
  const db = await initDB();
  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO reports (year, file_url, admin_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [report.year, report.file_url, report.admin_id]
  );
  const insertId = result.insertId;
  return { ...report, id: insertId, created_at: new Date(), updated_at: new Date() };
};

// Delete a report by ID
export const deleteReportService = async (id: number): Promise<boolean> => {
  const db = await initDB();
  const [result] = await db.query<ResultSetHeader>(
    'DELETE FROM reports WHERE id=?',
    [id]
  );
  return result.affectedRows > 0;
};

// Get all reports
export const getAllReportsService = async (): Promise<Report[]> => {
  const db = await initDB();
  const [rows] = await db.query<RowDataPacket[]>(
    'SELECT * FROM reports ORDER BY created_at DESC'
  );
  return rows as Report[];
};
