import bcrypt from "bcryptjs";

function hashPassword(plainTextPassword: string) {
  return bcrypt.hash(plainTextPassword, 10);
}

function comparePassword(plainTextPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
}

export default {
  hashPassword,
  comparePassword,
};
