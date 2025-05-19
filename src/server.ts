import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./config/db"

// Import routes
import authRoutes from "./routes/auth.routes"
import formRoutes from "./routes/form.routes"
import responseRoutes from "./routes/response.routes"

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Routes
// app.use("/api/auth", authRoutes)
app.use("/api/forms", formRoutes)
app.use("/api/responses", responseRoutes)

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
