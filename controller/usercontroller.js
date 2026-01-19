import User from "../models/user.js";
import createToken from "../utils/generateToken.js";

const signup = async (req,res) => {
    try {
        const {fullname,email,password,isAdmin} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).send({error: "User already exists !" });
        };
        const newUser = await User.create({
            fullname,
            email,
            password,
            isAdmin
        });
        res.send({
            message:"User created",
            user:{
                fullname: newUser.fullname,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            },
        });

    } catch (error) {
        res.status(500).send({error:error.message})
    };
};

const login = async(req,res) => {
    try {
        const {email,password}= req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).send({error: "User not found"});

        if( await user.matchPassword(password)){
            createToken(res, user._id);
            res.send({
                message:"Login sucess !",
                user:{
                    fullname:user.fullname,
                    email:user.email,
                    isAdmin:user.isAdmin,
                },
            });
        } else{
         res.status(400).send({error:"Password didn't matched"})
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    };
};

const logout = async(req,res) => {
    try {
        if(req.user){
            res.clearcookie("jwt");
            res.send({message:"Logout sucess !"});
        } else {
            res.status(400).send({message:"User not logged in !"})
        };
    } catch (error) {
        res.status(500).send({error:error.message})
    };
};

const getUserprofile = async(req,res) => {
    res.send(req.user)
};

const updateProfile = async(req,res) => {
    try {
        const user = await User.findById(req.user._id)
        if(!user) return res.status(404).send({message:"User not found !"});

        user.fullname = req.body.fullname || user.fullname;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.user.password;
        };
    } catch (error) {
        res.status(500).send({error:error.message});
    };
};

const updatedUser = async(req,res) => {
    try {
        res.send({
        message:"User updated",
        user:{
            fullname:updatedUser.fullname,
            email:updatedUser.email,
        }
        });
    } catch (error) {
        res.status(500).send({error:error.message})
    };
};

export {signup,login,logout,getUserprofile,updateProfile,updatedUser};