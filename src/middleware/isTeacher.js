export const isTeacher = (req, res, next) => {
  if (!["teacher"].includes(req.user.userType)) {
    res.status(401).json({
      status: false,
      message: "User role student not authenticated",
    });
  }
  next();
};
