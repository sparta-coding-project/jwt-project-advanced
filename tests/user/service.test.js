import { jest } from "@jest/globals";
import UserService from "../../src/services/user.service";

const mockRepo = {
  getUser: jest.fn(async (data) => {
    const { username, email, password } = data;
    return null;
  }),
  createUser: jest.fn(data => {
    const { username, email, password } = data;
    return ({
        userId: 2,
        username,
        email,
        password,
    })
  }),
  deleteUser: jest.fn(),
};

describe("UserService", () => {
  test("signup", async () => {
    const userService = new UserService(mockRepo);
    const mockData = {
      username: "이름",
      email: "asdf@gmail.com",
      password: "123456",
    };
    expect(await userService.signup(mockData)).toEqual({
      ...mockData,
      userId: 2,
    });
  });
});
