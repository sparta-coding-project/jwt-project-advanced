import { describe, jest } from "@jest/globals";
import UserRepository from "../../src/repositories/user.repo.js";
import UserService from "../../src/services/user.service.js";

const mockPrisma = {
  users: {
    findFirst: jest.fn()
  },
};

const userRepository = new UserRepository(mockPrisma);

describe("UserReopsitory", () => {

  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

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
