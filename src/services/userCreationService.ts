import { InternalError } from "../domain/errors";
import { fromCreationRequest } from "../domain/user";
import { UserCreationRequest } from "../domain/userCreationRequest";
import { fetchByEmail, insert } from "../repositories/userRepository";

const createUser = async (request: UserCreationRequest) => {
  const { email } = request;
  const alreadyExistingUser = await fetchByEmail(email);
  if (alreadyExistingUser)
    throw new InternalError("userAlreadyExists", `${email} already registered`);
  const user = await fromCreationRequest(request);
  await insert(user);
};

export { createUser };
