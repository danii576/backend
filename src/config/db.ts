import mysql, { Connection, RowDataPacket, ResultSetHeader } from "mysql2/promise";

let connection: Connection | null = null;

export const initDB = async (): Promise<Connection> => {
  if (connection) return connection; // reuse existing connection

  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "moita_stack"
  });

  console.log("✅ MySQL connected!");
  return connection;
};

export type { RowDataPacket, ResultSetHeader };
