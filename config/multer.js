import multer from "multer";
import path from "path";
import { getUploadsDir } from "./uploads.js";

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, getUploadsDir());
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname || "") || "";
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export function handleMulterError(err, req, res, next) {
  if (!err) return next();

  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ message: "File is too large. Maximum size is 10 MB." });
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({ message: "Invalid file field." });
  }

  console.error("Multer error:", err);
  return res
    .status(400)
    .json({ message: err.message || "File upload failed" });
}

/** Wrap multer middleware so errors return JSON (not HTML crash). */
export function runUpload(middleware) {
  return (req, res, next) => {
    middleware(req, res, (err) => handleMulterError(err, req, res, next));
  };
}
