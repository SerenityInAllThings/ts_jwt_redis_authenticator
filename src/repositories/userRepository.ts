import { getClient } from "../clients/redisClient";
import User from "../domain/user";

const getUserKeyByEmail = (email: string) => `user:${email}`;
const getUserKey = ({ email }: User) => getUserKeyByEmail(email);
const serialize = (user: User) => JSON.stringify(user);
const deserialize = (raw: string) => JSON.parse(raw) as User;

const insert = async (user: User) => {
  const client = await getClient();
  const key = getUserKey(user);
  await client.set(key, serialize(user));
};

const fetchByEmail = async (email: User["email"]) => {
  const client = await getClient();
  const key = getUserKeyByEmail(email);
  const raw = await client.get(key);
  if (!raw) return null;
  return deserialize(raw);
};

export { insert, fetchByEmail };
