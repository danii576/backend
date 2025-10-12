import { db } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model";

export class AdminService {
  async login(user_name: string, password: string) {
    const [rows]: any = await db.query("SELECT * FROM admins WHERE user_name = ?", [user_name]);
    const admin = rows[0];
    if (!admin) throw new Error("Invalid username or password");

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) throw new Error("Invalid username or password");

    const token = jwt.sign(
      { id: admin.id, user_name: admin.user_name },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    return { token };
  }

  async register(user_name: string, password: string): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result]: any = await db.query(
      "INSERT INTO admins (user_name, password, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [user_name, hashedPassword]
    );
    return { id: result.insertId, user_name, password: hashedPassword };
  }
}
