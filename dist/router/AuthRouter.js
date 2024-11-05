"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const UserController_1 = require("../controller/UserController");
exports.authRouter = express_1.default.Router();
exports.authRouter
    .post('/login', AuthController_1.login)
    .post('/register', AuthController_1.register)
    .get('/auth', AuthController_1.checkAuth, UserController_1.getUser)
    .post('/generate', AuthController_1.generateOtp)
    .post('/verify', AuthController_1.verifyOtp);
