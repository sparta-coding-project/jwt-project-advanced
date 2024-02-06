import express from "express";
import authorization from "../middleware/auth.middleware.js";
import { prisma } from "../utils/prisma/index.js";
import { resumeValidation } from "../utils/validator.js";

const router = express.Router();

router
  .route("/resume")
  .post(authorization, async (req, res) => {
    const { user } = req;
    const { title, content, status } = req.body;
    const newResume = await prisma.resume.create({
      data: {
        userId: user.userId,
        title: title,
        content: content,
        status: status,
      },
    });
    if (newResume) {
      return res.status(201).json({ message: "새로운 이력서를 등록했습니다." });
    } else {
      return res.status(401).json({ message: "제목과 내용을 입력해주세요" });
    }
  })
  .get(authorization, async (req, res) => {
    const { user } = req;
    const { orderKey = 'resumeId', orderValue = "desc" } = req.query;

    const resumeList = await prisma.resume.findMany({
      where: {
        userId: orderKey,
      },
      orderBy:{
        [orderKey]: orderValue,
      }
    });

    if (resumeList.length !== 0) {
      return res.status(200).json({
        message: `${user.username}의 이력서 목록 조회가 완료되었습니다.`,
        resumeList,
      });
    } else {
      return res.status(400).json({
        message: `${user.username}의 이력서 목록이 없습니다.`,
      });
    }
  });

router
  .route("/resume/:resumeId")
  .get(authorization, async (req, res) => {
    const { user } = req;
    const { resumeId } = req.params;

    const resume = await prisma.resume.findFirst({
      where: {
        AND: [{ userId: user.userId }, { resumeId: +resumeId }],
      },
    });

    if (resume) {
      return res.status(200).json({
        message: `${user.id}의 ${resumeId}번 이력서의 조회를 완료하였습니다.`,
        data: resume,
      });
    } else {
      return res.status(400).json({ message: "조회를 실패하였습니다." });
    }
  })
  .patch(authorization, async (req, res) => {
    try {
      const { user } = req;
      console.log(user);
      const { resumeId } = req.params;
      const { title, content, status } = req.body;
      await resumeValidation.validate(req.body);

      const specificResume = await prisma.resume.findFirst({
        where:{
          resumeId: resumeId
        }
      })

      if (!specificResume) return res.status(400).json({
        message: "이력서가 존재하지 않습니다."
      })

      const updateResume = await prisma.resume.update({
        data: {
          title: title,
          content: content,
        },
        where: {
          userId: user.userId,
          resumeId: +resumeId,
        },
      });

      if (updateResume) {
        return res.status(201).json({
          message: "이력서 수정이 완료되었습니다.",
          data: updateResume,
        });
      } else {
        return res.status(400).json({
          message: "이력서를 수정하지 못했습니다.",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "이력서를 수정할 권한이 없습니다.",
      });
    }
  })
  .delete(authorization, async (req, res) => {
    try {
      const { user } = req;
      const { resumeId } = req.params;
      const deleteUser = await prisma.resume.delete({
        where: {
          resumeId: +resumeId,
          userId: user.userId,
        },
      });
      if (deleteUser) {
        console.log(deleteUser);
        return res.status(201).json({ message: "이력서 삭제가 완료되었습니다." });
      } else {
        return res.status(400).json({ message: "이력서 조회에 실패하였습니다." });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "삭제할 권한이 없습니다." });
    }
  });

export default router;
