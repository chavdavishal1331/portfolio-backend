import fs from "fs";
import cloudinary from "../config/cloudinary.js";

const hasCloudinaryConfig = () =>
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

async function uploadToCloudinary(file) {
  if (file.path && fs.existsSync(file.path)) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "portfolio",
      resource_type: "auto",
    });
    return result.secure_url;
  }

  if (file.buffer?.length) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolio", resource_type: "auto" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result.secure_url);
        }
      );
      stream.end(file.buffer);
    });
  }

  throw new Error("No file data for Cloudinary upload");
}

export async function resolveUploadedImageUrl(file) {
  if (!file) return "";

  if (hasCloudinaryConfig()) {
    try {
      return await uploadToCloudinary(file);
    } catch (error) {
      console.warn("Cloudinary upload failed:", error.message);
      if (!file.filename && !file.path) {
        throw new Error(
          "Cloudinary upload failed. Check Cloudinary env vars on Render."
        );
      }
    }
  }

  if (!file.filename) {
    throw new Error(
      "Image could not be saved. Set Cloudinary on Render or try a smaller image (max 10MB)."
    );
  }

  return `/uploads/${file.filename}`;
}

export function resolveLocalFileUrl(file) {
  if (!file?.filename) {
    throw new Error("File upload failed");
  }
  return `/uploads/${file.filename}`;
}
