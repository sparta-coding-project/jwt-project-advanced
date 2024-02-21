// import { resumeValidation } from "../utils/validator";

export default class {
  constructor(resumeService) {
    this.resumeService = resumeService;
  }

  createResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { title, content, status = "APPLY" } = req.body;

      const newResume = await this.resumeService.createResume({
        userId,
        title,
        content,
        status,
      });
      return res
        .status(201)
        .json({ message: "이력서가 생성되었습니다.", data: newResume });
    } catch (error) {
      next(error);
    }
  };

  getAllResumes = async (req, res, next) => {
    try {
      const { orderKey = "resumeId", orderValue = "desc" } = req.query;
      const allResumes = await this.resumeService.getAllResumes({
        orderKey,
        orderValue,
      });
      return res
        .status(201)
        .json({
          message: "전체 이력서 조회를 완료했습니다.",
          data: allResumes,
        });
    } catch (error) {
      next(error);
    }
  };

  getResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;
      const resume = await this.resumeService.getResume({
        userId: +userId,
        resumeId: +resumeId,
      });
      return res
        .status(200)
        .json({ message: "이력서 조회가 완료되었습니다.", data: resume });
    } catch (error) {
      next(error);
    }
  };

  editResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;
      const { title, content, status } = req.body;
      const updatedResume = await this.resumeService.editResume({
        userId,
        resumeId,
        title,
        content,
        status,
      });
      return res.status(201).json({
        message: "이력서 수정이 완료되었습니다.",
        data: updatedResume,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { resumeId } = req.params;
      const deletedResume = await this.resumeService.deleteResume({
        userId: +userId,
        resumeId: +resumeId,
      });
      return res
        .status(201)
        .json({
          message: "이력서 삭제가 완료되었습니다.",
          data: deletedResume,
        });
    } catch (error) {
      next(error);
    }
  };
}
