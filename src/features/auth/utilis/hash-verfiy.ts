import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPasswordHash = async (
  passwordHash: string,
  password: string
) => {
  return await bcrypt.compare(password, passwordHash);
};
