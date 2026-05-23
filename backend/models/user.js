import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { z } from "zod";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,   
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const userAddSchema = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  isAdmin: z.boolean().optional().default(false),
});

const User = mongoose.model("User", UserSchema);
export default User;
