/**
 * Deletes all portfolio content (keeps admin accounts).
 * Run: node scripts/clearPortfolioData.js
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Experience from "../models/Experience.js";
import Contact from "../models/Contact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

async function main() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in backend/.env");
    process.exit(1);
  }

  await connectDB();

  const [profile, skills, projects, experience, messages] = await Promise.all([
    Profile.deleteMany({}),
    Skill.deleteMany({}),
    Project.deleteMany({}),
    Experience.deleteMany({}),
    Contact.deleteMany({}),
  ]);

  console.log("Portfolio data cleared:");
  console.log("  Profile:", profile.deletedCount);
  console.log("  Skills:", skills.deletedCount);
  console.log("  Projects:", projects.deletedCount);
  console.log("  Experience:", experience.deletedCount);
  console.log("  Messages:", messages.deletedCount);
  console.log("(Admin login accounts were NOT deleted)");

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
