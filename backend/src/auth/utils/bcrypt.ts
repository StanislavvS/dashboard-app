import * as bcrypt from 'bcryptjs';

export const encodePassword = (rawPassword: string) => {
  return bcrypt.hash(rawPassword, 8);
};

export const comparePasswords = (rawPassword: string, hashPassword: string) =>
  bcrypt.compare(rawPassword, hashPassword);
