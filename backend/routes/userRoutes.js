import express from 'express'
import { createNotes, deleteNotes, getNotes, updateNotes } from '../controller/userController.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router()

router.get("/",protect, getNotes)
router.post("/create",protect, createNotes)
router.put("/update/:id",protect, updateNotes)
router.delete("/:id",protect, deleteNotes)

export default router