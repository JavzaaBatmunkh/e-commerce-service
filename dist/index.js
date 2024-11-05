"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("./config/mongodb");
const UserRouter_1 = require("./router/UserRouter");
const AuthRouter_1 = require("./router/AuthRouter");
const ProductRouter_1 = require("./router/ProductRouter");
const UploadRouter_1 = require("./router/UploadRouter");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
(0, mongodb_1.connect)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use(UserRouter_1.userRouter);
app.use(AuthRouter_1.authRouter);
app.use(ProductRouter_1.productRouter);
app.use(UploadRouter_1.uploadRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
