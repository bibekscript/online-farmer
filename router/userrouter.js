import express from "express";
import {
    signup,
    login,
    logout,
    updateProfile,
     } from "../controller/usercontroller.js";
 import { userAddSchema } from "../models/user.js";
 import checkAuth from "../middleware/checkAuth.js";
 import validate from "../middleware/validationHandler.js";
 
 const router = express.Router();

 router.post("/signup",validate(userAddSchema),signup);
 router.post("/login",login);
 router.post("/logout",checkAuth,logout);
 router.post("/updateprofile",checkAuth,updateProfile);

 export default router;
