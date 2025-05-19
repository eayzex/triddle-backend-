import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()




export const connectDB = async () => {
  try {
    
    await mongoose.connect("mongodb+srv://eeexxeee666:dell2021@cluster0.kmwp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}
