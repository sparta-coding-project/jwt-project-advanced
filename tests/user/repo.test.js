import { describe, jest } from "@jest/globals";
import UserRepository from "../../src/repositories/user.repo.js";
import UserService from "../../src/services/user.service.js";

const myData = {
  userId: 1,
  username: "안녕이",
  email: "98@gmail.com",
  password: "123456",
  createdAt: new Date("2024-02-22T04:18:31.775Z"),
  updatedAt: new Date("2024-02-22T04:18:31.775Z"),
};

const mockPrisma = {
  users: {
    findFirst: jest.fn(({ email }) => {
      return myData
    }),
  },
};

const userRepository = new UserRepository(mockPrisma);

describe("UserReopsitory", () => {
  afterAll(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("getUser", async () => {
    const user = await userRepository.getUser();
    expect(typeof user).toBe("object");
    expect(user).toEqual({
      userId: 1,
      username: "안녕이",
      email: "98@gmail.com",
      password: "123456",
      createdAt: new Date('2024-02-22T04:18:31.775Z'),
      updatedAt: new Date('2024-02-22T04:18:31.775Z'),
    });
    expect(myData.email).toEqual("98@gmail.com")
  });

  test("createUser", () => {

  })
  // test("deleteUser")
});


