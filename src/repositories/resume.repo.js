export default class {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  createResume = async (data) => {
    const { userId, title, content, status = "APPLY" } = data;
    const newResume = await this.dataSource.getRepository("Resume").create({
      userId: +userId,
      title: title,
      content: content,
      status: status,
    });
    return newResume;
  };

  getResume = async (data) => {
    const resume = await this.dataSource.getRepository("Resume").findOne({
      where: { ...data },
    });
    return resume;
  };

  getAllResumes = async (data) => {
    const { orderKey = "resumeId", orderValue = "desc" } = data;
    const resumeList = await this.dataSource.getRepository("Resume").find({
      order: { [orderKey]: orderValue },
    });
    return resumeList;
  };

  editResume = async (data) => {
    const { userId, resumeId, title, content, status } = data;
    const updateResume = await this.dataSource.getRepository("Resume").update(
      {
        userId: +userId,
        resumeId: +resumeId,
      },
      {
        title: title,
        content: content,
        status: status,
      }
    );
    return updateResume;
  };

  deleteResume = async (data) => {
    const { userId, resumeId } = data;
    const deleteUser = await this.dataSource.getRepository("Resume").remove({
      resumeId: +resumeId,
      userId: +userId,
    });
    return deleteUser;
  };
}
