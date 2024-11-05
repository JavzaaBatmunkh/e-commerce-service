"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controller/ProductController");
exports.productRouter = express_1.default.Router();
exports.productRouter
    .get('/products', ProductController_1.getProduct)
    .post('/products', ProductController_1.createProduct)
    .put('/products/:id', ProductController_1.updateProduct)
    .delete('/products/:id', ProductController_1.deleteProduct)
    .get('/products/:id', ProductController_1.getProductById);
