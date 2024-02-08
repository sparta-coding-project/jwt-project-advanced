import express from "express";
import { verifyToken } from "../utils/token.js";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies;
    const { accessToken } = cookie;

    const userData = verifyToken(accessToken);

    const specificInfo = await prisma.users.findFirst({
      where: {
        userId: userData.userId,
      },
    });

    if (specificInfo) {
      return res.status(200).json({
        message: `Welcome! ${specificInfo.username}`,
        userInfo: specificInfo,
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: err})
  }
});

export default router;
