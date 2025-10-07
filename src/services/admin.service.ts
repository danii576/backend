// src/services/admin.service.ts
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const loginAdminService = async (user_name: string, password: string) => {
  const envUser = process.env.ADMIN_USER;
  const envPassHash = process.env.ADMIN_PASS_HASH!;

  if (user_name !== envUser) return null;

  const isValid = await bcrypt.compare(password, envPassHash);
  return isValid ? { user_name: envUser } : null;
};
