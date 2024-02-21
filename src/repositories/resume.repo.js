export default class {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createResume = async (data) => {
    const { userId, title, content, status = "APPLY" } = data;
    const newResume = await this.prisma.resume.create({
      data: {
        userId: +userId,
        title: title,
        content: content,
        status: status,
      },
    });
    return newResume;
  };

  getResume = async (data) => {
    const resume = await this.prisma.resume.findFirst({
      where: { ...data },
    });
    return resume;
  };

  getAllResumes = async (data) => {
    const { orderKey = "resumeId", orderValue = "desc" } = data;
    const resumeList = await this.prisma.resume.findMany({
      orderBy: { [orderKey]: orderValue },
    });
    return resumeList;
  };

  editResume = async (data) => {
    const { userId, resumeId, title, content, status } = data;
    const updateResume = await this.prisma.resume.update({
      data: {
        title: title,
        content: content,
        status: status,
      },
      where: {
        userId: +userId,
        resumeId: +resumeId,
      },
    });
    return updateResume;
  };

  deleteResume = async (data) => {
    const { userId, resumeId } = data;
    const deleteUser = await this.prisma.resume.delete({
      where: {
        resumeId: +resumeId,
        userId: +userId,
      },
    });
    return deleteUser
  };
}
