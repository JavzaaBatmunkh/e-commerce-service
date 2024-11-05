"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.updateUsers = exports.confirmMethod = exports.createUsers = exports.getUser = void 0;
const UserModel_1 = require("../model/UserModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
// export const getUsers = async (req: Request, res: Response) => {
//     const authtoken = req.headers["authtoken"];
//     const data = jwt.decode(authtoken + "")
//     try {
//         const users = await UserModel.find()
//         res.send(users)
//     }
//     catch (error) {
//         res.status(400).json({ errorMessage: "Error" })
//     }
// }
const getUser = async (req, res) => {
    const authtoken = req.headers["authtoken"];
    if (!authtoken) {
        return res.status(401).json({ errorMessage: "No token provided" });
    }
    const data = jsonwebtoken_1.default.decode(authtoken);
    if (typeof data !== 'object' || data === null || !('userId' in data)) {
        return res.status(401).json({ errorMessage: "Invalid token" });
    }
    try {
        const user = await UserModel_1.UserModel.findById(data.userId);
        if (!user) {
            return res.status(404).json({ errorMessage: "User not found" });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "Error retrieving user" });
    }
};
exports.getUser = getUser;
const createUsers = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;
        const user = await UserModel_1.UserModel.create({ name, email, password, phoneNumber, address });
        res.send(user);
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Create doesn't working!" });
    }
};
exports.createUsers = createUsers;
const confirmMethod = async (req, res) => {
    try {
        const { password } = req.body;
        const _id = req.headers['userid']; // Retrieve user ID from headers
        if (!password || !_id) {
            return res.status(400).json({ message: "Password and User ID are required!" });
        }
        const user = await UserModel_1.UserModel.findOne({ _id });
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }
        const isEqual = await bcrypt_1.default.compare(password, user.password);
        console.log(isEqual);
        if (!isEqual) {
            return res.status(401).json({ message: "Invalid password!" });
        }
        return res.status(200).json({ message: "Password confirmed!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.confirmMethod = confirmMethod;
const updateUsers = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;
        const { id } = req.params;
        const hashedPassword = await bcrypt_1.default.hash(String(password), Number(process.env.SALT_SECRET));
        const update = await UserModel_1.UserModel.findByIdAndUpdate(id, { name, email, password: hashedPassword, phoneNumber, address });
        res.send(update);
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" });
    }
};
exports.updateUsers = updateUsers;
const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        await UserModel_1.UserModel.deleteOne({ _id: id });
        res.send({ message: "Successfully deleted!" });
    }
    catch (error) {
        res.status(400).json({ errorMessage: "Edit doesn't working!" });
    }
};
exports.deleteUsers = deleteUsers;
