"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResponse = exports.getResponse = exports.getResponses = exports.submitResponse = void 0;
const Response_1 = __importDefault(require("../models/Response"));
const Form_1 = __importDefault(require("../models/Form"));
// @desc    Submit form response
// @route   POST /api/responses
// @access  Public
const submitResponse = async (req, res) => {
    try {
        const { formId, data } = req.body;
        // Check if form exists
        const form = await Form_1.default.findById(formId);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found",
            });
        }
        // Create response
        const response = await Response_1.default.create({
            formId,
            data,
        });
        res.status(201).json({
            success: true,
            data: response,
        });
    }
    catch (error) {
        console.error("Submit response error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.submitResponse = submitResponse;
// @desc    Get all responses for a form
// @route   GET /api/responses/:formId
// @access  Private
const getResponses = async (req, res) => {
    try {
        const { formId } = req.params;
        // Check if form exists and belongs to user
        const form = await Form_1.default.findById(formId);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found",
            });
        }
        // Make sure user owns the form
        if (form.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access these responses",
            });
        }
        // Get responses
        const responses = await Response_1.default.find({ formId });
        res.status(200).json({
            success: true,
            count: responses.length,
            data: responses,
        });
    }
    catch (error) {
        console.error("Get responses error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getResponses = getResponses;
// @desc    Get single response
// @route   GET /api/responses/:formId/:id
// @access  Private
const getResponse = async (req, res) => {
    try {
        const { formId, id } = req.params;
        // Check if form exists and belongs to user
        const form = await Form_1.default.findById(formId);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found",
            });
        }
        // Make sure user owns the form
        if (form.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this response",
            });
        }
        // Get response
        const response = await Response_1.default.findOne({ _id: id, formId });
        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Response not found",
            });
        }
        res.status(200).json({
            success: true,
            data: response,
        });
    }
    catch (error) {
        console.error("Get response error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getResponse = getResponse;
// @desc    Delete response
// @route   DELETE /api/responses/:formId/:id
// @access  Private
const deleteResponse = async (req, res) => {
    try {
        const { formId, id } = req.params;
        // Check if form exists and belongs to user
        const form = await Form_1.default.findById(formId);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found",
            });
        }
        // Make sure user owns the form
        if (form.userId.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to delete this response",
            });
        }
        // Get response
        const response = await Response_1.default.findOne({ _id: id, formId });
        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Response not found",
            });
        }
        await response.deleteOne();
        res.status(200).json({
            success: true,
            data: {},
        });
    }
    catch (error) {
        console.error("Delete response error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.deleteResponse = deleteResponse;
