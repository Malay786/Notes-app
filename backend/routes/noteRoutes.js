import express from 'express';
import { Router } from 'express';
import {protectedRoute} from '../middleware/authMiddleware.js';
import { createNote, deleteNote, getNotes, getSingleNote, updateNote } from '../controllers/noteController.js';

const router = Router();


router.get("/get", protectedRoute, getNotes);
router.get("/get/:id", protectedRoute, getSingleNote);
router.post('/create', protectedRoute, createNote);
router.put('/update/:id', protectedRoute, updateNote);
router.delete("/delete/:id", protectedRoute, deleteNote);

export default router;