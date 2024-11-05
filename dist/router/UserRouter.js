"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const AuthController_1 = require("../controller/AuthController");
exports.userRouter = express_1.default.Router();
exports.userRouter
    .get('/user', AuthController_1.checkAuth, UserController_1.getUser)
    .post('/user', UserController_1.createUsers)
    .put('/user/:id', UserController_1.updateUsers)
    .delete('/user/:id', UserController_1.deleteUsers)
    .post('/method', UserController_1.confirmMethod);
