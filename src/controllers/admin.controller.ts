import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

const adminService = new AdminService();

export class AdminController {
  async login(req: Request, res: Response) {
    try {
      const { user_name, password } = req.body;
      const token = await adminService.login(user_name, password);
      res.status(200).json(token);
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { user_name, password } = req.body;
      const admin = await adminService.register(user_name, password);
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
