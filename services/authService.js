import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) throw new Error("Invalid email");

  const match = await bcrypt.compare(password, admin.password);

  if (!match) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { admin, token };
};