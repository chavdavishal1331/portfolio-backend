import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    roles: [String],
    shortBio: String,
    description: String,
    image: String,
    resume: String,
    experience: String,
    projects: String,
    clients: String,
    email: String,
    phone: String,
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
