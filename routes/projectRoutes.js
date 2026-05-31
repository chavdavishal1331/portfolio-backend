import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload, runUpload } from "../config/multer.js";
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", authMiddleware, runUpload(upload.single("image")), addProject);
router.put(
  "/:id",
  authMiddleware,
  runUpload(upload.single("image")),
  updateProject
);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
