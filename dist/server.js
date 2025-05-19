"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const form_routes_1 = __importDefault(require("./routes/form.routes"));
const response_routes_1 = __importDefault(require("./routes/response.routes"));
// Load environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(0, db_1.connectDB)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Routes
// app.use("/api/auth", authRoutes)
app.use("/api/forms", form_routes_1.default);
app.use("/api/responses", response_routes_1.default);
// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
