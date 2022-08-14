import { InternalError } from "./errors";

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