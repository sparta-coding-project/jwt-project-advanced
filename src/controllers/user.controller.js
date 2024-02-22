export default class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  signup = async (req, res, next) => {
    try {
      await this.userService.signup(req.body);
      return res.status(201).json({ message: "Sign-up successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  signin = async (req, res, next) => {
    try {
      const user = await this.userService.signin(req.body);
      if (user) {
        req.session.user = {
          userId: user.userId,
          email: user.email,
        };
      } else {
        throw new Error("로그인 에러");
      }
      return res.status(200).json({ message: "sign-in successfully" });
    } catch (error) {
      //   res.status(404).json({ message: "error" });
      next(error);
    }
  };

  userInfo = async (req, res, next) => {
    try {
      const user = await req.user;

      return res
        .status(200)
        .json({ message: "retrieve user-data successfully", data: user });
    } catch (error) {
      return res.status(404).json({ message: "User doesn't exist" });
      next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      req.session.destroy();
      return res.status(200).json({ message: "sign-out successfully" });
    } catch (error) {
      return res.status(401).json({ message: "error" });
    }
  };

  deleteAccount = async (req, res, next) => {
    try {
      const { user } = req.session;
      const { password } = req.body;
      await this.userService.deleteAccount(user, password);
      return res.status(201).json({ message: "delete successfully" });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
    }
  };
}
