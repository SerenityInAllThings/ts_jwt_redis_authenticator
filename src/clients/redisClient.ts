import { createClient, RedisClientType } from "redis";
import { getRedisConnectionUrl } from "../domain/environmentVariables";

const handleErrors = (err: any) => {
  // TODO: improve error handling
  console.error("Error in redis client: ", err);
};

const getClientFactory = () => {
  let client: RedisClientType;

  return async () => {
    // TODO: make redis url dynamic based on environment
    if (!client) {
      client = createClient({ url: getRedisConnectionUrl() });
      client.on("error", handleErrors);
      await client.connect();
    }
    return client;
  };
};

const getClient = getClientFactory();

export { getClient };
