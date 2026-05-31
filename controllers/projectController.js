import Project from "../models/Project.js";
import { resolveUploadedImageUrl } from "../utils/uploadImage.js";
import { normalizeAssetUrl } from "../utils/normalizeAssetUrl.js";

function formatProject(project) {
  if (!project) return project;
  const obj = project.toObject ? project.toObject() : { ...project };
  if (obj.image) obj.image = normalizeAssetUrl(obj.image);
  return obj;
}

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects.map(formatProject));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const { title, description, tech, githubLink, liveLink } = req.body;
    const imageUrl = req.file
      ? normalizeAssetUrl(await resolveUploadedImageUrl(req.file))
      : "";

    const project = await Project.create({
      title,
      description,
      tech: tech || "",
      githubLink: githubLink?.trim() || "",
      liveLink: liveLink?.trim() || "",
      image: imageUrl,
    });

    res.status(201).json(formatProject(project));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description, tech, githubLink, liveLink } = req.body;
    const update = {
      title,
      description,
      tech: tech || "",
      githubLink: githubLink?.trim() || "",
      liveLink: liveLink?.trim() || "",
    };

    if (req.file) {
      update.image = normalizeAssetUrl(
        await resolveUploadedImageUrl(req.file)
      );
    }

    const project = await Project.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(formatProject(project));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
