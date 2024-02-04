import express from "express";
import redisClient from "../utils/redisClient.js";

const router = express.Router();

router.get("/get/:userId", async (req, res) => {
    const {userId} = req.params
  const data = await redisClient.get(userId);
  if (data) return res.status(200).json({ message: "성공적으로 불러왔습니다.", data });
  return res.status(400).json({ message: "데이터가 없습니다." });
});

router.post("/set", async (req, res)=>{
    const {userId, token} = req.query;
    await redisClient.set(userId+"", token)
})

export default router;
