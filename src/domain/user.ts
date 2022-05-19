import crypto from "crypto";
import { InternalError } from "./errors";

export default interface User {
  email: string;
  passwordHash: string;
  salt: string;
}

export interface UserCreationRequest {
  email: string;
  password: string;
}

export const isUserCreationRequest = (
  value?: any
): value is UserCreationRequest => {
  // TODO: validate email
  // TODO: set minimum password requirements
  if (!value) throw new InternalError("invalidBody", "missing body");
  if (!value.email) throw new InternalError("invalidBody", "missing email");
  if (!value.password)
    throw new InternalError("invalidBody", "missing password");
  return true;
};

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
