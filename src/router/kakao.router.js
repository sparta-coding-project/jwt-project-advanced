import express from "express";
import axios from 'axios';
import "dotenv/config"

const router = express.Router();

router.get("/kakao/start", (req, res) => {
        const baseUrl = "https://kauth.kakao.com/oauth/authorize";
        const config = {
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: "http://localhost:3002/users/kakao/end",
          response_type: "code",
        };
        const params = new URLSearchParams(config).toString();
      
        const finalUrl = `${baseUrl}?${params}`;
        return res.redirect(finalUrl);
    })

router.get("/kakao/end",()=>{})
