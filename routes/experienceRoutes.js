import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getExperience,
  getExperienceById,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getExperience);
router.get("/:id", getExperienceById);
router.post("/", authMiddleware, addExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;
