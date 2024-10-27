import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(password, hashPassword);
};

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};
