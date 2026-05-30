export const validateLogin = (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and Password required");
  }
};