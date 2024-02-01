import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { createUsersValidation } from "../utils/validator.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { id, email, password } = req.body;
        // validation
        await createUsersValidation.validateAsync(req.body);
        // find specific user data
        const specificUser = await prisma.users.findFirst({
            where: { 
                OR:[{id: id}, {email: email}]
            },
        });
        if (specificUser){
            if (specificUser.id === id && specificUser.email === email){
                return res.json({error: "Duplicate ID and EMAIL. Please use another ID and EMAIL"});
            }else if (specificUser.id === id) {
                return res.json({error: "Duplicate ID. Please use another ID"});
            } else if (specificUser.email === email) {
                return res.json({error: "Duplicate EMAIL. Please use another EMAIL"})
            }
        }else{
            await prisma.users.create({
                data: {
                    id,
                    email,
                    password,
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
