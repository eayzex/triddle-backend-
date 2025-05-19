import type { Request, Response } from "express"
import FormResponse from "../models/Response"
import Form from "../models/Form"

// @desc    Submit form response
// @route   POST /api/responses
// @access  Public
export const submitResponse = async (req: Request, res: Response) => {
  try {
    const { formId, data } = req.body

    // Check if form exists
    const form = await Form.findById(formId)
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      })
    }

    // Create response
    const response = await FormResponse.create({
      formId,
      data,
    })

    res.status(201).json({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Submit response error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get all responses for a form
// @route   GET /api/responses/:formId
// @access  Private
export const getResponses = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params

    // Check if form exists and belongs to user
    const form = await Form.findById(formId)
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      })
    }

    // Make sure user owns the form
    if (form.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access these responses",
      })
    }

    // Get responses
    const responses = await FormResponse.find({ formId })

    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses,
    })
  } catch (error) {
    console.error("Get responses error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get single response
// @route   GET /api/responses/:formId/:id
// @access  Private
export const getResponse = async (req: Request, res: Response) => {
  try {
    const { formId, id } = req.params

    // Check if form exists and belongs to user
    const form = await Form.findById(formId)
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      })
    }

    // Make sure user owns the form
    if (form.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this response",
      })
    }

    // Get response
    const response = await FormResponse.findOne({ _id: id, formId })

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Response not found",
      })
    }

    res.status(200).json({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Get response error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Delete response
// @route   DELETE /api/responses/:formId/:id
// @access  Private
export const deleteResponse = async (req: Request, res: Response) => {
  try {
    const { formId, id } = req.params

    // Check if form exists and belongs to user
    const form = await Form.findById(formId)
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      })
    }

    // Make sure user owns the form
    if (form.userId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this response",
      })
    }

    // Get response
    const response = await FormResponse.findOne({ _id: id, formId })

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Response not found",
      })
    }

    await response.deleteOne()

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (error) {
    console.error("Delete response error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}
