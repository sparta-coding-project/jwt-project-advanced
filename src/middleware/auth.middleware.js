import { prisma } from "../utils/prisma/index.js";
import { verifyToken } from "../utils/token.js";
import redisClient from "../utils/redisClient.js";
import { tokenGenerator } from "../utils/token.js";

const verifyRefresh = (req, res) => {

}

const authorization = async (req, res, next) => {
  try {
    let { accessToken } = req.cookies;

    const { userId, id } = verifyToken(accessToken);

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
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed verifying Access Token" });
  }
};

export default authorization;
