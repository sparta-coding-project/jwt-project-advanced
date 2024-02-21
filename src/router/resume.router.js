import ResumeController from '../controllers/resume.controller.js';
import ResumeService from '../services/resume.service.js'
import ResumeRepository from '../repositories/resume.repo.js';
import { prisma } from '../utils/prisma/index.js';
import express from 'express';
import authorization from '../middleware/auth.middleware.js';

const router = express.Router();

const resumeRepository = new ResumeRepository(prisma);
const resumeService = new ResumeService(resumeRepository);
const resumeController = new ResumeController(resumeService);

router.route("/resumes")
    .post(authorization, resumeController.createResume) // 새로운 resume 작성
    .get(authorization, resumeController.getAllResumes) // resume 전체 조회

router.route("/resumes/:resumeId")
    .get(authorization, resumeController.getResume) // 특정 resume 조회
    .patch(authorization, resumeController.editResume) // 특정 resume 수정
    .delete(authorization, resumeController.deleteResume) // 특정 resume 삭제

export default router