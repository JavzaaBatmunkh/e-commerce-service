import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controller/CategoryController";


export const categoryRouter = express.Router()

categoryRouter
.get('/categories', getCategories)
.post('/categories', createCategory)
.put('/categories/:id', updateCategory)
.delete('/categories/:id', deleteCategory)
.get('/categories/:id', getCategoryById)