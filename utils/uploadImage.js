import cloudinary from "../config/cloudinary.js";

const baseUrl = () =>
  `http://localhost:${process.env.PORT || 5000}`;

const hasCloudinaryConfig = () =>
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

export async function resolveUploadedImageUrl(file) {
  if (!file) return "";

  if (hasCloudinaryConfig()) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    } catch (error) {
      console.warn("Cloudinary upload failed, using local storage:", error.message);
    }
  }

  if (!file.filename) {
    throw new Error("Image upload failed");
  }

  return `${baseUrl()}/uploads/${file.filename}`;
}

export function resolveLocalFileUrl(file) {
  if (!file?.filename) {
    throw new Error("File upload failed");
  }
  return `${baseUrl()}/uploads/${file.filename}`;
}
