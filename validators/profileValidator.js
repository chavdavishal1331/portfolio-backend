export const validateProfile = (data) => {
  const { name, role } = data;

  if (!name || !role) {
    throw new Error("Name and Role required");
  }
};