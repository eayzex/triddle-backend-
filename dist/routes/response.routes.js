"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_controller_1 = require("../controllers/response.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.post("/", response_controller_1.submitResponse);
// Protected routes
router.get("/:formId", auth_1.protect, response_controller_1.getResponses);
router.route("/:formId/:id").get(auth_1.protect, response_controller_1.getResponse).delete(auth_1.protect, response_controller_1.deleteResponse);
exports.default = router;
