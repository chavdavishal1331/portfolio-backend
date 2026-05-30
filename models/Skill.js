import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: String,
    percentage: Number,
    icon: String,
    color: String,
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);