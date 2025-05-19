"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Generate JWT Token
const generateToken = (id) => {
    // Utiliser une assertion de type plus spécifique pour résoudre le problème de type
    const options = {
        expiresIn: process.env.JWT_EXPIRE
    };
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, options);
};
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // Create user
        const user = yield User_1.default.create({
            name,
            email,
            password,
        });
        // Generate token
        const token = generateToken(user._id);
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    }
    catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
exports.register = register;
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check for user
        const user = yield User_1.default.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // Check if password matches
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // Generate token
        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
exports.login = login;
// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.id);
        res.status(200).json({
            success: true,
            user: {
                id: user === null || user === void 0 ? void 0 : user._id,
                name: user === null || user === void 0 ? void 0 : user.name,
                email: user === null || user === void 0 ? void 0 : user.email,
                createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
            },
        });
    }
    catch (error) {
        console.error("Get me error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
exports.getMe = getMe;
