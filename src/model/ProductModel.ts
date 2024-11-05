import { model, Schema } from "mongoose";

const schema = new Schema({
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
    updatedAt: Date,
    types: [],
    tag: String, 
    sold: Number
})

export const ProductModel= model("Product", schema)