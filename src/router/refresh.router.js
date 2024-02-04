import express from 'express';
import redisClient from '../utils/redisClient.js';
import { tokenGenerator, verifyToken } from '../utils/token.js';

const router = express.Router()

router.post("/token", async (req, res) => {
    const { refreshToken } = req.cookies;
    const userData = verifyToken(refreshToken);
    const {userId, id, role} = userData;
    if (refreshToken) {
        const cachedToken = await redisClient.get(userId+"")
        if (cachedToken === refreshToken){
            const tokens = tokenGenerator(res, userData);
            await redisClient.set(userId+"", tokens.refreshToken);
            return res.status(201).json({message: "새로운 토큰이 발급되었습니다.",
            tokens
        })
        }
    }
})

export default router