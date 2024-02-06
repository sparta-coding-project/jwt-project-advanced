import express from "express";
import { prisma } from "../utils/prisma/index.js";
import cookieParser from "cookie-parser";
import { createAccessToken, createRefreshToken } from "../utils/token.js";
import 'dotenv/config'
import { comparePW } from "../utils/bcrypt.js";
import { tokenGenerator } from "../utils/token.js";
import { loginValidation } from "../utils/validator.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        await loginValidation(req.body)
        const specificUser = await prisma.users.findFirst({
            where: {
                email: email
            },
        });
    
        if (specificUser && await comparePW(password, specificUser.password)) {
            const tokens = await tokenGenerator(res, specificUser);
            return res.status(201).json({
                message: "액세스 토큰이 발급되었습니다.",
                ...tokens
            })
        }else{
            return res.status(401).json({message: "아이디 혹은 비밀번호가 틀렸습니다."})
        }
    }catch(err){

    }
});

export default router