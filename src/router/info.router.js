import express from "express";
import { verifyAccessToken } from "../utils/acessToken.js";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

router.get("/user", async (req, res) => {
  const cookie = req.cookies;
  const {accessToken} = cookie;

  const userData = verifyAccessToken(accessToken);

  const specificInfo = await prisma.userInfo.findFirst({
    where: {
      userId: userData.userId,
    },
  });

  if (specificInfo) {
    return res.status(200).json({
      message: `Welcome! ${specificInfo.id}`,
      userInfo: specificInfo,
    });
  }
});

export default router;
