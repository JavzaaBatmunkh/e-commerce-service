import express from "express";
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controller/ProductController";

export const productRouter = express.Router()

productRouter
.get('/products', getProduct)
.post('/products', createProduct)
.put('/products/:id', updateProduct)
.delete('/products/:id', deleteProduct)
.get('/products/:id', getProductById)