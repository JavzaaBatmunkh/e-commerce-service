"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    productName: String,
    productCode: String,
    categoryId: String,
    price: Number,
    quantity: Number,
    thumbnails: String,
    images: [String],
    coupon: String,
    salePercent: Number,
    description: String,
    viewsCount: Number,
    createdAt: Date,
    updatedAt: Date
});
exports.ProductModel = (0, mongoose_1.model)("Product", schema);
