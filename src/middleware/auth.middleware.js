import { prisma } from "../utils/prisma/index.js";

const authorization = async (req, res, next) => {
  try {
    const { userId, email } = req.session.user;
    console.log("auth;:::::", userId, email);

    const specificUser = await prisma.users.findFirst({
      where: {
        AND: [
          {
            userId: +userId,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (specificUser) {
      req.user = specificUser;
      next();
    } else {
      return res.status(401).json({ message: "로그인을 해주세요" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

export default authorization;
