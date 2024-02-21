export default class {
  constructor(resumeRepository) {
    this.resumeRepository = resumeRepository;
  }

  createResume = async (data) => {
    const newResume = await this.resumeRepository.createResume(data);
    return newResume;
  };
  getAllResumes = async (data) => {
    const allResumes = await this.resumeRepository.getAllResumes(data);
    return allResumes;
  };
  getResume = async (data) => {
    const resume = await this.resumeRepository.getResume(data);
    if (resume){
        
        return resume;
    }else{
        throw {
            message: "이력서 조회를 실패했습니다."
        }
    }
  };
  editResume = async (data) => {
    const { userId, resumeId } = data;
    const specificResume = await this.resumeRepository.getResume({
      userId: +userId,
      resumeId: +resumeId,
    });
    if (!specificResume) {
      throw {
        message: "이력서가 존재하지 않습니다.",
      };
    }

    const updatedResume = await this.resumeRepository.editResume(data)
    if (!updatedResume) {
      throw {
        message: "이력서를 수정하지 못했습니다.",
      };
    } else {
      return updatedResume;
    }
  };
  deleteResume = async (data) => {
    const { userId, resumeId } = data;
    const specificResume = await this.resumeRepository.getResume({
      resumeId: +resumeId,
    });
    if (!specificResume) {
      throw {
        message: "이력서가 존재하지 않습니다.",
      };
    }
    const deletedUser = await this.resumeRepository.deleteResume({
      userId: +userId,
      resumeId: +resumeId,
    });
    if (deletedUser) {
      return deletedUser;
    } else {
      throw { message: "이력서 조회에 실패하였습니다." };
    }
  };
}
