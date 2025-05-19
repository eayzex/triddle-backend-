import express from "express"
import { submitResponse, getResponses, getResponse, deleteResponse } from "../controllers/response.controller"
import { protect } from "../middleware/auth"

const router = express.Router()

// Public routes
router.post("/", submitResponse)

// Protected routes
router.get("/:formId", protect, getResponses)
router.route("/:formId/:id").get(protect, getResponse).delete(protect, deleteResponse)

export default router
