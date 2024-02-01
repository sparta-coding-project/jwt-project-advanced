import { prisma } from "../utils/prisma/index.js";
import { verifyAccessToken } from "../utils/acessToken.js";

export default async (req, res, next) => {
  const { cookie } = req.headers;
  const accessToken = cookie.split("=")[1];
  const { userId, id } = verifyAccessToken(accessToken);

  const user = await prisma.users.findFirst({
    where: {
      userId: +userId,
    },
  });

  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};
