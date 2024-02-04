import express from "express";
import cookieParser from "cookie-parser";
import redis from 'redis'
import signupRouter from "./src/router/signup.router.js";
import loginRouter from "./src/router/login.router.js";
import infoRouter from "./src/router/info.router.js";
import resumeRouter from "./src/router/resume.router.js";
import redisRouter from './src/router/redis.router.js'
import redisClient from "./src/utils/redisClient.js";
import refreshRouter from './src/router/refresh.router.js'
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", [signupRouter, loginRouter, infoRouter, resumeRouter, refreshRouter]);
app.use("/redis", [redisRouter])


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
});

export default app;
