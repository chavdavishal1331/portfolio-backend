import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tech: String,
    image: String,
    githubLink: String,
    liveLink: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);