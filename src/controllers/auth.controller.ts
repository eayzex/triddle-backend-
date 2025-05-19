import type { Request, Response } from "express"
import jwt, { SignOptions } from "jsonwebtoken"
import User from "../models/User"

// Generate JWT Token
const generateToken = (id: string): string => {
  // Utiliser une assertion de type plus spécifique pour résoudre le problème de type
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRE as unknown as number
  }
  
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET as string,
    options
  )
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    
    // Check if user already exists
    const userExists = await User.findOne({ email })
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      })
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })
    
    // Generate token
    const token = generateToken(user._id)
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Register error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    
    // Check for user
    const user = await User.findOne({ email }).select("+password")
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }
    
    // Check if password matches
    const isMatch = await user.comparePassword(password)
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }
    
    // Generate token
    const token = generateToken(user._id)
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
    
    res.status(200).json({
      success: true,
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email,
        createdAt: user?.createdAt,
      },
    })
  } catch (error) {
    console.error("Get me error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}