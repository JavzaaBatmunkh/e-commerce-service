"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const MONGODB_URI = process.env.MONGODB_URI ?? '';
const connect = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log("Connected to database successfully");
    }
    catch (error) {
        console.error(error);
    }
};
exports.connect = connect;
