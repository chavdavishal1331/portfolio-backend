import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload, runUpload } from "../config/multer.js";
import Profile from "../models/Profile.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

const profileUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

router.get("/", getProfile);
router.post(
  "/",
  authMiddleware,
  runUpload(profileUpload),
  updateProfile
);
router.put(
  "/",
  authMiddleware,
  runUpload(profileUpload),
  updateProfile
);

router.delete("/", authMiddleware, async (req, res) => {
  try {
    await Profile.deleteMany({});
    res.json({ message: "Profile cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
