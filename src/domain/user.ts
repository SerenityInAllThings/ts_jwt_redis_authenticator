import crypto from "crypto";
import { UserCreationRequest } from "./userCreationRequest";

export default interface User {
  email: string;
  passwordHash: string;
  salt: string;
}

export const isUser = (value?: any): value is User =>
  value != undefined &&
  typeof value == 'object' &&
  !Array.isArray(value) &&
  ["email", "passwordHash", "salt"].every(prop => 
    prop in value && typeof prop == 'string'
  )


export const fromCreationRequest = async (
  request: UserCreationRequest
): Promise<User> => {
  const { email, password } = request;
  const { salt, passwordHash } = await hashPassword(password);
  return { email, salt, passwordHash };
};

const hashPassword = (
  password: string
): Promise<Pick<User, "salt" | "passwordHash">> =>
  new Promise((resolve, reject) => {
    const encoding = "hex";
    const digest = "sha512";
    const iterations = 5;
    const salt = crypto.randomBytes(64).toString(encoding);
    crypto.pbkdf2(password, "salt", iterations, 32, digest, (err, hash) => {
      if (err || !hash) reject(err);
      else resolve({ salt, passwordHash: hash.toString(encoding) });
    });
  });
