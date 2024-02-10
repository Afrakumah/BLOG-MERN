import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const mongoUri = process.env.MONGO_URI;

const connectDb = async () => {
    try {
      const connection = await mongoose.connect(mongoUri);
  
      if (connection) {
        console.log("mongodb connected successfully");
      }
  
    } catch (error) {
      console.log(error);
    }
  };
  
  export default connectDb;