import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGO_URI); // debug

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("MongoDb connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
