import { prisma } from "../utils/prisma/index.js";
import { verifyAccessToken } from "../utils/acessToken.js";

export default async (req, res, next) => {
    console.log('안녕하세요')
  const { cookie } = req.headers;
  console.log(req.headers.authorization)
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
    return res.status(401).json({ message: "로그인을 해주세요" });
  }
};
