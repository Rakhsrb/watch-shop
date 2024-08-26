import jwt from "jsonwebtoken";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export default function (userType) {
  return async (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (!token) {
      return sendErrorResponse(res, 409, "Access not allowed!⛔");
    } else {
      if (userType === "admin") {
        try {
          const decodedToken = jwt.verify(token, process.env.JWTSECRET_KEY);
          req.userInfo = { userId: decodedToken._id, role: "admin" };
          next();
        } catch (error) {
          return res.status(404).json({ message: "Что-то пошло не так!" });
        }
      } else if (userType === "client") {
        try {
          const decodedToken = jwt.verify(token, process.env.JWTSECRET_KEY);
          req.userInfo = { userId: decodedToken._id, role: "client" };
          next();
        } catch (error) {
          return res.status(404).json({ message: "Что-то пошло не так!" });
        }
      }
    }
  };
}
