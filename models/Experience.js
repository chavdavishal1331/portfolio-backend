import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    year: String,
    duration: String,
    color: String,
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);