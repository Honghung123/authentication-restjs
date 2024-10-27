import * as bcrypt from 'bcrypt';

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(password, hashPassword);
};

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(
    password,
    parseInt(process.env.SALT_OR_ROUNDS) ?? 10,
  );
};
