import Project from "../models/Project.js";

export const getAllProjectsService = async () => {
  return await Project.find();
};