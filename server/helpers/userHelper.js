import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
};

export const matchPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
