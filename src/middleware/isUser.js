import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isUser = async (req, res, next) => {
  const reqheaders = req.headers.authorization;

  const token = reqheaders && reqheaders.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!token && !refreshToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Access denied. No refresh token provided" });
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const accessToken = jwt.sign({ decoded }, process.env.JWT_SECRET, {
        expiresIn: "1m",
      });

      return res.status(200).json({
        message:
          "Your previous access token was expired. Your new accessToken is",
        accessToken,
      });
    } catch (err) {
      next(err);
      return res.status(400).json({ message: "Invalid Token" });
    }
  }
};
