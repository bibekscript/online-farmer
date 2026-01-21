import mongoose from "mongoose";
import{z} from "zod"

const ProductSchema =new mongoose.Schema(
    {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    
    name:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    price:{
        type:String,
        required:true
    },
    
    category:{
        type:String,
        required:true
    },

    image:{
        type:String,
        default:"images/sample.jpg"
    },

    countInStock:{
        type:Number
    }
    }
);

export const productAddSchema=z.object({
    name:z.string().min(2),
    description:z.string().optional(),
    price:z.string(),
    category:z.string().min(2),
    image: z.string().default("/images/sample.jpg"),
});

const Product=mongoose.model("Product",ProductSchema);
export default Product;


