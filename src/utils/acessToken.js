import jwt from "jsonwebtoken";
import "dotenv/config";

export const createAccessToken = (userData) => {
  const accessToken = jwt.sign(
    { ...userData },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      algorithm: "HS512",
      expiresIn: "12h",
    }
  );
  return accessToken;
};

export const verifyAccessToken = (token) => {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, {
    algorithms: "HS512",
  });
  return decoded;
};

export const createRefreshToken = (id) => {
  const refreshToken = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: "12h",
  });
  return refreshToken;
};
