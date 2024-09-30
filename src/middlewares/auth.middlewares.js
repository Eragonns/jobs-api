import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  try {
    console.log("hedears: ", req.headers);
    const token = req.headers.authorization.split(" ")[1] || null;

    if (!token) {
      throw new UnauthenticatedError("Pas de token fourni");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.userId;
    req.user = {
      userId
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Acces non autorisé");
  }
};

export default authenticateUser;
