import Profile from "../models/Profile.js";
import {
  resolveUploadedImageUrl,
  resolveLocalFileUrl,
} from "../utils/uploadImage.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = { ...req.body };

    // Prevent invalid image/resume values from frontend
    delete data.image;
    delete data.resume;

    // Upload image if selected
    if (req.files?.image?.[0]) {
      data.image = await resolveUploadedImageUrl(req.files.image[0]);
    }

    // Upload resume if selected
    if (req.files?.resume?.[0]) {
      data.resume = resolveLocalFileUrl(req.files.resume[0]);
    }

    // Convert roles string to array
    if (typeof data.roles === "string") {
      data.roles = data.roles
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    }

    let profile = await Profile.findOne();

    if (profile) {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      profile = await Profile.create(data);
    }

    res.json(profile);
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};