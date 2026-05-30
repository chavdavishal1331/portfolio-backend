import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", authMiddleware, upload.single("image"), addProject);
router.put("/:id", authMiddleware, upload.single("image"), updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
