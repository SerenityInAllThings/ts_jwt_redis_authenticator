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

const encoding = "hex";
const hashPassword = async (
  password: string
): Promise<Pick<User, "salt" | "passwordHash">> => {
  const salt = crypto.randomBytes(64).toString(encoding);
  const passwordHash = await generateHash(password, salt)
  return { salt, passwordHash }
}

const generateHash = (password: string, salt: string) => new Promise<string>((resolve, reject) => {
  const iterations = 5;
  const digest = "sha512";
  crypto.pbkdf2(password, salt, iterations, 32, digest, (err, hash) => {
    if (err || !hash) reject(err);
    else resolve(hash.toString(encoding));
  });
})

export const isPasswordCorrect = async ({salt, passwordHash}: User, password: string) => {
  const newHash = await generateHash(password, salt)
  return newHash  === passwordHash
}
  