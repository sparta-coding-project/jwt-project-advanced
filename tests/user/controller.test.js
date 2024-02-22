import UserController from "../../src/controllers/user.controller.js";
import { describe, jest } from "@jest/globals";

const mockService = {
  signup: jest.fn(() => {
    return {
      userId: 1,
      username: "jack",
      email: "jack@abc.xyz",
      password: "123456",
    };
  }),
  signin: jest.fn(),
  deleteAccount: jest.fn(),
};

describe("UserController", () => {
  afterAll(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("signup", async () => {
    const userController = new UserController(mockService);
    const req = {
      body: { username: "jack", email: "jack@abc.xyz", password: "123456" },
    };
    const res = {status: () => {}};
    expect(await userController.signup(req, res, (e) => console.log(e))).toBe({
      username: "jack",
      email: "jack@abc.xyz",
      password: "123456",
    });
  });
});
