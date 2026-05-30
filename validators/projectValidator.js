export const validateProject = (data) => {
  const { title, description } = data;

  if (!title || !description) {
    throw new Error("Title and Description required");
  }
};