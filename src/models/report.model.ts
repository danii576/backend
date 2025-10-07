// src/models/report.model.ts
export interface Report {
  id?: number;           // optional for new reports
  year: number;
  file_url: string;
  admin_id: number;
  created_at?: Date;
  updated_at?: Date;
}
