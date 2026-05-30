import Profile from "../models/Profile.js";

export const getProfileService = async () => {
  return await Profile.findOne();
};