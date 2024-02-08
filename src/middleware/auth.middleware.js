import { prisma } from "../utils/prisma/index.js";
import { verifyToken } from "../utils/token.js";

const authorization = async (req, res, next) => {
  try {
    // console.log(req)
    const { accessToken } = req.cookies;
  
    const { userId } = verifyToken(accessToken);

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
    return res.status(400).json({ message: error.message });
  }
};

export default authorization;
