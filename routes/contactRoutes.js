import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", authMiddleware, getMessages);
router.delete("/:id", authMiddleware, deleteMessage);

export default router;
