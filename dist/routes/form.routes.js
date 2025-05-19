"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const form_controller_1 = require("../controllers/form.controller");
const router = express_1.default.Router();
// Public routes
router.get("/public/:id", form_controller_1.getPublicForm);
// Protected routes
router.route("/").get(form_controller_1.getForms).post(form_controller_1.createForm);
router.route("/:id").get(form_controller_1.getForm).put(form_controller_1.updateForm).delete(form_controller_1.deleteForm);
exports.default = router;
