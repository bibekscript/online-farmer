import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).send({ message: "You need to login first!" });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(_id).select("-password");

    req.user = user;

    next(); 
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

export { checkAuth };
