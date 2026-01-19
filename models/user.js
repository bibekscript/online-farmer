import mongoose from "mongoose"
import{z} from "zod"

const UserSchema=new mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            minLength:6,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
    },
    {
        timestamps :true,
    },
);

export const userAddSchema=z.object({
    fullname:z.string().min(2),
    email:z.email(),
    password:z.string().min(6),
    isAdmin:z.boolean().default(false),
});

const User=mongoose.model("user",UserSchema);
export default User;