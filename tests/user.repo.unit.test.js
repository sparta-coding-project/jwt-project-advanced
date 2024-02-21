import { describe } from "@jest/globals";
import UserRepository from "../src/repositories/user.repo.js";
import UserService from "../src/services/user.service.js";
import { prisma } from "../src/utils/prisma/index.js";

let mockPrisma = {
  users: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("UserReopsitory", () => {
  const userRepository = new UserRepository(mockPrisma);

  test("getUser", async () => {
    const userData = {
      userId: 2,
      username: "안녕이",
      email: "hello@gmail.com",
      role: null,
    };

    expect(await userRepository.getUser({ userId: 2 })).toEqual(userData);
  });
  // test("createUser")
  // test("deleteUser")
});

describe("UserService", () => {
  const userService = new UserService();
});
