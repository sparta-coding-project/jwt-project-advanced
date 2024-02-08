import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { createUsersValidation } from "../utils/validator.js";
import { hashPW } from "../utils/bcrypt.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // validation
        await createUsersValidation.validateAsync(req.body);
        // find specific user data
        const specificUser = await prisma.users.findFirst({
            where: {
                email:email
            },
        });
        if (specificUser){
            if (specificUser.username === username && specificUser.email === email)
                return res.json({error: "Duplicate ID and EMAIL. Please use another ID and EMAIL"});
            if (specificUser.username === username) 
                return res.json({error: "Duplicate ID. Please use another ID"});
            if (specificUser.email === email) 
                return res.json({error: "Duplicate EMAIL. Please use another EMAIL"});
        }else{
            const hashed = await hashPW(password)
            await prisma.users.create({
                data: {
                    username,
                    email,
                    password: hashed,
                },
            });
            return res.status(201).json({ message: "Sign-up successfully" });
        }
    } catch (error) {
        console.error(error)
        return res.status(400)
            // .json(error.details[0].message)
    }
});

export default router;
