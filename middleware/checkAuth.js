import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async(res,req,next) => {
    const token =req.cookies.jwt;
    if(!token) {
    return  res.status(401).send({message:"You need to login first !"});
    };
    try {
        const{ _id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(_id);
        req.user = {
            _id : user._id,
            fullname: user.fullname,
            email: user.email,
            isAdmin: user.isAdmin,
        };

    } catch (error) {
        res.status(500).send({error:error.message})
    };
    next();
};

export default checkAuth;
