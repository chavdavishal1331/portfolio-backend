import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", authMiddleware, addSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

export default router;
