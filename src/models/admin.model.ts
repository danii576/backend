// src/models/admin.model.ts
export interface Admin {
  id?: number;             // optional when creating
  user_name: string;
  password: string;        // in production, store hashed password
  created_at?: Date;
  updated_at?: Date;
}
