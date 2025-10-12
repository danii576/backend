import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const router = Router();
const controller = new AdminController();

// Public routes
router.post("/login", controller.login.bind(controller));
router.post("/register", controller.register.bind(controller)); // optional

export default router;
