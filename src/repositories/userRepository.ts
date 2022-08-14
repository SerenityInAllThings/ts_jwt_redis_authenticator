import { getClient } from "../clients/redisClient";
import { InternalError } from "../domain/errors";
import User, { isUser } from "../domain/user";

const getUserKeyByEmail = (email: string) => `user:${email}`;
const getUserKey = ({ email }: User) => getUserKeyByEmail(email);
// validPropTypes is preventing me from accidentally storing nested objects
// before implementing it's serialization/deserialization
const isValidType = (value: string) => {
  const type = typeof value
  return ["string", "number"].includes(type)
}

const insert = async (user: User) => {
  const client = await getClient();
  const key = getUserKey(user);

  // TODO: improve how we serialize users
  let multi = client.multi()
  Object.entries(user).forEach(([field, value]) => {
    if (!isValidType(value)) 
      throw new InternalError('notImplemented', 'Serialization does not support complex objects')
    multi = multi.hSet(key, field, value)
  })
  await multi.exec()
};

const fetchByEmail = async (email: User["email"]) => {
  const client = await getClient();
  const key = getUserKeyByEmail(email);
  const user = await client.hGetAll(key)
  if (!user || Object.keys(user).length === 0) return null;
  if (isUser(user)) return user as User
  throw new InternalError('internalError', `weird value in user '${email}': ${JSON.stringify(user)}`)
};

export { insert, fetchByEmail };
