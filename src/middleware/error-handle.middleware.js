export default (error, req, res, next) => {
  console.error(error);
  return res.status(500).json({ errorMessage: "서버 에러 발생" });
};
