// src/controllers/admin.controller.ts
import type { Request, Response } from "express";
import { loginAdminService } from "../services/admin.service";

export const loginAdminController = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    if (!user_name || !password) {
      return res.status(400).json({ message: "user_name and password are required" });
    }

    const admin = await loginAdminService(user_name, password);
    if (admin) {
      res.status(200).json({ message: "Login successful", admin });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};
