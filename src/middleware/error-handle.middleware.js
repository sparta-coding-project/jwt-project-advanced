export default (error, req, res, next) => {
  console.error(error);
  return res.status(500).json({ error: error });
};
