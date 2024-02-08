import redisClient from "./redisClient.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const tokenGenerator = (res, specificUser) => {
  const userData = {
    userId: specificUser.userId,
    id: specificUser.id,
    role: specificUser.role,
  };
  const accessToken = createAccessToken(userData);
  const refreshToken = createRefreshToken(userData);
  res.cookie("accessToken", `${accessToken}`);
  res.cookie("refreshToken", `${refreshToken}`);

  redisClient.set(userData.userId + "", refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};

export const createAccessToken = (userData) => {
  const accessToken = jwt.sign(
    { ...userData },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      algorithm: "HS512",
      expiresIn: "1h",
    }
  );
  return accessToken;
};

export const createRefreshToken = (userData) => {
  const refreshToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: "3d",
  });
  return refreshToken;
};

export const verifyToken = (token) => {
  try{
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {
      algorithms: "HS512",
    });
    return decoded;
  }catch(err){
    throw {
      name: err.name,
      message: err.message,
      expiredAt: err.expiredAt
    }
  }
};
