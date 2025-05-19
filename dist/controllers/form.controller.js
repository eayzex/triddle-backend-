"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicForm = exports.deleteForm = exports.updateForm = exports.getForm = exports.getForms = exports.createForm = void 0;
const Form_1 = __importDefault(require("../models/Form"));
// @desc    Create new form
// @route   POST /api/forms
// @access  Private
const createForm = async (req, res) => {
    try {
        // Add user to request body
        console.log("========================");
        // req.body.userId = req.user.id
        console.log("Creating form with data:", req.body);
        const form = await Form_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: form,
        });
    }
    catch (error) {
        console.error("Create form error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.createForm = createForm;
// @desc    Get all forms for a user
// @route   GET /api/forms
// @access  Private
const getForms = async (req, res) => {
    try {
        const forms = await Form_1.default.find({});
        res.status(200).json({
            success: true,
            count: forms.length,
            data: forms,
        });
    }
    catch (error) {
        console.error("Get forms error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getForms = getForms;
// @desc    Get single form
// @route   GET /api/forms/:id
// @access  Private/Public
const getForm = async (req, res) => {
    try {
        console.log("==========Fetching form with ID==========:", req.params.id);
        const form = await Form_1.default.findById(req.params.id);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found",
            });
        }
        // // Check if form belongs to user or if it's a public form
        // if (req.user && form.userId.toString() !== req.user.id) {
        //   // For public access, we might want to limit what fields are returned
        //   return res.status(200).json({
        //     success: true,
        //     data: {
        //       id: form._id,
        //       title: form.title,
        //       description: form.description,
        //       questions: form.questions,
        //       createdAt: form.createdAt,
        //     },
        //   })
        // }
        console.log("Form found:", form);
        res.status(200).json({
            success: true,
            data: form,
        });
    }
    catch (error) {
        console.error("Get form error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getForm = getForm;
// @desc    Update form
// @route   PUT /api/forms/:id
// @access  Private
const updateForm = async (req, res) => {
    try {
        let form = await Form_1.default.findById(req.params.id);
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
                message: "Not authorized to update this form",
            });
        }
        form = await Form_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: form,
        });
    }
    catch (error) {
        console.error("Update form error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.updateForm = updateForm;
// @desc    Delete form
// @route   DELETE /api/forms/:id
// @access  Private
const deleteForm = async (req, res) => {
    try {
        const form = await Form_1.default.findById(req.params.id);
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
                message: "Not authorized to delete this form",
            });
        }
        await form.deleteOne();
        res.status(200).json({
            success: true,
            data: {},
        });
    }
    catch (error) {
        console.error("Delete form error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.deleteForm = deleteForm;
// @desc    Get public form (no auth required)
// @route   GET /api/forms/public/:id
// @access  Public
const getPublicForm = async (req, res) => {
    try {
        const form = await Form_1.default.findById(req.params.id);
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found",
            });
        }
        // Return limited data for public access
        res.status(200).json({
            success: true,
            data: {
                id: form._id,
                title: form.title,
                description: form.description,
                questions: form.questions,
                createdAt: form.createdAt,
            },
        });
    }
    catch (error) {
        console.error("Get public form error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.getPublicForm = getPublicForm;
