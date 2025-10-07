import mysql, { Connection, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connection: Connection | null = null;

export const initDB = async (): Promise<Connection> => {
  if (connection) return connection;

  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error("❌ Missing DB configuration in .env file");
  }

  connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  });

  console.log("✅ MySQL connected!");
  return connection;
};

export type { RowDataPacket, ResultSetHeader };
