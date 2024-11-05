"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist!"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false
    },
    phoneNumber: String,
    address: String,
    zipCode: Number,
    cartId: String,
    createdAt: Date,
    updatedAt: Date,
});
exports.UserModel = (0, mongoose_1.model)("User", schema);
