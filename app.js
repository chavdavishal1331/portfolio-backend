import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import corsOptions from "./config/cors.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors(corsOptions));

app.use("/api", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }
  next(err);
});
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, version: "admin-cors-fix" });
});

const adminDir = path.join(__dirname, "admin-dist");
if (fs.existsSync(adminDir)) {
  app.use("/admin", express.static(adminDir));
  app.get(/^\/admin(\/.*)?$/, (req, res) => {
    res.sendFile(path.join(adminDir, "index.html"));
  });
}

export default app;