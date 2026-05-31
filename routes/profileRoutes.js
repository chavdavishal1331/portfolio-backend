import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload, runUpload } from "../config/multer.js";
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

export default router;
