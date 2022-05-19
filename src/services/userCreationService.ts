import { fromCreationRequest, UserCreationRequest } from "../domain/user";
import { insert } from "../repositories/userRepository";

const createUser = async (request: UserCreationRequest) => {
  const user = await fromCreationRequest(request);
  await insert(user);
};

export { createUser };
