import { hashPW } from "../utils/bcrypt.js";

export default class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }


  getUser = async (userData) => {
    const user = await this.prisma.users.findFirst({
      select: {
        userId: true,
        username: true,
        email: true,
        role: true,
      },
      where: {
        ...userData,
      },
    });
    return user;
  };

  createUser = async (data) => {
    const { username, email, password } = data;
    const hashed = await hashPW(password);
    const newUser = await this.prisma.users.create({
      data: {
        username,
        email,
        password: hashed,
      },
    });
    return newUser;
  };

  deleteUser = async (data) => {
    const { userId } = data;
    const deleteUser = await this.prisma.users.delete({
      where: {
        userId: +userId,
      },
    });
    return deleteUser;
  };
}

// export default UserRepository;
