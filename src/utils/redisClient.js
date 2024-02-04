import Redis from "redis";

const redisClient = await Redis.createClient(process.env.PORT_REDIS)
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export default redisClient;
