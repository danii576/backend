// src/config/db.ts
import mysql, { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error("❌ Missing DB configuration in .env file");
}

export const db: Pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

console.log("✅ MySQL connection pool created!");

export type { RowDataPacket, ResultSetHeader };
