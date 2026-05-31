import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Experience from "../models/Experience.js";
import Contact from "../models/Contact.js";

const router = express.Router();

/** Delete all portfolio content (skills, projects, etc.). Keeps admin accounts. */
router.post("/clear-content", authMiddleware, async (req, res) => {
  try {
    const [profile, skills, projects, experience, messages] = await Promise.all([
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Contact.deleteMany({}),
    ]);

    res.json({
      message: "All portfolio content deleted",
      deleted: {
        profile: profile.deletedCount,
        skills: skills.deletedCount,
        projects: projects.deletedCount,
        experience: experience.deletedCount,
        messages: messages.deletedCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
