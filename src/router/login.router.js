import express from "express";
import { prisma } from "../utils/prisma/index.js";
import cookieParser from "cookie-parser";
import { createAccessToken } from "../utils/acessToken.js";
import 'dotenv/config'

const router = express.Router();

router.get("/login", async (req, res) => {
    const { id, password } = req.body;

    const specificUser = await prisma.users.findFirst({
        where: {
            AND: [{ id: id }, { password: password }],
        },
    });
    // const specificUser= 'hi'

    if (specificUser) {
        const userData = { userId:specificUser.userId, id: specificUser.id, role: specificUser.role}
        const accessToken = createAccessToken(userData);
        res.cookie("accessToken", accessToken);
        return res.status(201).json({
            message: "액세스 토큰이 발급되었습니다.",
            "accessToken": accessToken,
        })
    }else{
        return res.status(401).json({message: "아이디 혹은 비밀번호가 틀렸습니다."})
    }
});

export default router