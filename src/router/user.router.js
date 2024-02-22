import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import UserController from "../controllers/user.controller.js";
import UserService from "../services/user.service.js";
import UserRepository from "../repositories/user.repo.js";
import { dataSource } from "../typeorm/index.js";
const router = express.Router();

const userRepository = new UserRepository(dataSource);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/userInfo", authMiddleware, userController.userInfo);
router.post("/signout", authMiddleware, userController.signout);
router.post("/deleteAccount", authMiddleware, userController.deleteAccount);

export default router;
