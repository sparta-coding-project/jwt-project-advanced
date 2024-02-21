import UserRepository from "../repositories/user.repo.js";
import { createUsersValidation, signinValidation } from "../utils/validator.js";
import { comparePW } from "../utils/bcrypt.js";

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  signup = async (data) => {
    const { username, email, password } = data;
    // validation
    await createUsersValidation.validateAsync(data);
    const user = await this.userRepository.getUser({ email });
    if (user) {
      if (user.username === username && user.email === email)
        throw {
          message: "Duplicate ID and EMAIL. Please use another ID and EMAIL",
        };
      if (user.username === username)
        throw { message: "Duplicate ID. Please use another ID" };
      if (user.email === email)
        throw {
          message: "Duplicate EMAIL. Please use another EMAIL",
        };
    } else {
      await this.userRepository.createUser(data);
    }
  };

  signin = async (data) => {
    const { email, password } = data;
    await signinValidation.validateAsync(data);
    const user = await this.userRepository.getUser({ email });
    if (user) {
      if (await comparePW(password, user.password)) {
        return user;
      } else {
        return false;
      }
    } else {
      throw { message: "User not exist" };
    }
  };

  deleteAccount = async (data, password) => {
    const { userId } = data;
    const user = await this.userRepository.getUser({ userId });
    if (comparePW(password, user.password)) {
      await this.userRepository.deleteUser({ userId });
    } else {
      throw {
        message: "Password is incorrect",
      };
    }
  };
}
