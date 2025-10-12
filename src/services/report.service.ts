// src/services/report.service.ts
import { db, RowDataPacket, ResultSetHeader } from "../config/db";
import type { Report } from "../models/report.model";

// Add a new report
export const createReportService = async (report: Report): Promise<Report> => {
  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO reports (year, file_url, admin_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [report.year, report.file_url, report.admin_id]
  );
  const insertId = result.insertId;
  return { ...report, id: insertId, created_at: new Date(), updated_at: new Date() };
};

// Delete a report by ID
export const deleteReportService = async (id: number): Promise<boolean> => {
  const [result] = await db.query<ResultSetHeader>(
    'DELETE FROM reports WHERE id=?',
    [id]
  );
  return result.affectedRows > 0;
};

// Get all reports
export const getAllReportsService = async (): Promise<Report[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    'SELECT * FROM reports ORDER BY created_at DESC'
  );
  return rows as Report[];
};

// Get report by ID
export const getReportByIdService = async (id: number): Promise<Report | null> => {
  const [rows] = await db.query<RowDataPacket[]>(
    'SELECT * FROM reports WHERE id = ?',
    [id]
  );
  return (rows as Report[])[0] || null;
};

// Update a report
export const updateReportService = async (id: number, report: Partial<Report>): Promise<Report | null> => {
  const fields: string[] = [];
  const values: any[] = [];

  Object.entries(report).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });

  values.push(id);

  const sql = `UPDATE reports SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`;
  await db.query<ResultSetHeader>(sql, values);

  return getReportByIdService(id);
};
