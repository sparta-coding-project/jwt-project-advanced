export default class UserRepository {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  getUser = async (userData) => {
    const user = await this.dataSource.getRepository("Users").findOne({
      where: {
        ...userData,
      },
    });
    return user;
  };

  createUser = async ({ username, email, password }) => {
    const newUser = await this.dataSource.getRepository("Users").create({
      username,
      email,
      password,
    });
    return newUser;
  };

  deleteUser = async (data) => {
    const { userId } = data;
    const deleteUser = await this.dataSource.getRepository("Users").remove({
      where: {
        userId: +userId,
      },
    });
    return deleteUser;
  };
}
