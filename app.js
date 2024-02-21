import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import redisRouter from "./src/router/redis.router.js";
import userRouter from "./src/router/user.router.js";
import errorHandleMiddleware from "./src/middleware/error-handle.middleware.js";

import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.TOKEN_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 180000,
    },
  })
);

app.use("/api", [userRouter]);
app.use("/redis", [redisRouter]);
app.use(errorHandleMiddleware)

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
