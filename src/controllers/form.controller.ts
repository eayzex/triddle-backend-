import type { Request, Response } from "express"
import Form from "../models/Form"

// @desc    Create new form
// @route   POST /api/forms
// @access  Private
export const createForm = async (req: Request, res: Response) => {
  try {
    // Add user to request body

    console.log("========================")
    // req.body.userId = req.user.id
    console.log("Creating form with data:", req.body)

    const form = await Form.create(req.body)

    res.status(201).json({
      success: true,
      data: form,
    })
  } catch (error) {
    console.error("Create form error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get all forms for a user
// @route   GET /api/forms
// @access  Private
export const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find({  })

    res.status(200).json({
      success: true,
      count: forms.length,
      data: forms,
    })
  } catch (error) {
    console.error("Get forms error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get single form
// @route   GET /api/forms/:id
// @access  Private/Public
export const getForm = async (req: Request, res: Response) => {
  try {
    console.log("==========Fetching form with ID==========:", req.params.id)
    const form = await Form.findById(req.params.id)

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      })
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
console.log("Form found:", form)
    res.status(200).json({
      success: true,
      data: form,
    })
  } catch (error) {
    console.error("Get form error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Update form
// @route   PUT /api/forms/:id
// @access  Private
export const updateForm = async (req: Request, res: Response) => {
  try {
    let form = await Form.findById(req.params.id)

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
        message: "Not authorized to update this form",
      })
    }

    form = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      data: form,
    })
  } catch (error) {
    console.error("Update form error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Delete form
// @route   DELETE /api/forms/:id
// @access  Private
export const deleteForm = async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id)

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
        message: "Not authorized to delete this form",
      })
    }

    await form.deleteOne()

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (error) {
    console.error("Delete form error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

// @desc    Get public form (no auth required)
// @route   GET /api/forms/public/:id
// @access  Public
export const getPublicForm = async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id)

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      })
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
    })
  } catch (error) {
    console.error("Get public form error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}
