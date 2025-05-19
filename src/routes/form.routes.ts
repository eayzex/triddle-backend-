import express from "express"
import { createForm, getForms, getForm, updateForm, deleteForm, getPublicForm } from "../controllers/form.controller"
import { protect } from "../middleware/auth"

const router = express.Router()

// Public routes
router.get("/public/:id", getPublicForm)

// Protected routes
router.route("/").get( getForms).post( createForm)

router.route("/:id").get( getForm).put( updateForm).delete( deleteForm)

export default router
