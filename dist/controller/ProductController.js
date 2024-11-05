"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProduct = void 0;
const ProductModel_1 = require("../model/ProductModel");
const getProduct = async (req, res) => {
    try {
        const { price = -1 } = req.query;
        const products = await ProductModel_1.ProductModel.find({}, null, { sort: { price: Number(price) } }).limit(10);
        res.send(products);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: "Error" });
    }
};
exports.getProduct = getProduct;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await ProductModel_1.ProductModel.findById(id);
        res.send(users);
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Error" });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const { productName, description, productCode, price, quantity, images, } = req.body;
        const user = await ProductModel_1.ProductModel.create({
            productName,
            description,
            productCode,
            price,
            quantity,
            images,
            createdAt: new Date()
        });
        res.send(user);
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Create doesn't working!", error });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { productName, description, productCode, price, quantity, } = req.body;
        const { id } = req.params;
        const update = await ProductModel_1.ProductModel.findByIdAndUpdate(id, {
            productName,
            description,
            productCode,
            price,
            quantity,
        });
        res.send(update);
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModel_1.ProductModel.deleteOne({ _id: id });
        res.send({ message: "Successfully deleted!" });
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" });
    }
};
exports.deleteProduct = deleteProduct;
