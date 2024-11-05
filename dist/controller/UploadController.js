"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const cloudinary_1 = require("../config/cloudinary");
const uploader = async (req, res) => {
    const files = req.files;
    if (!files)
        return res.status(400).send('No file uploaded');
    try {
        const promises = [];
        files.forEach(file => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            promises.push((0, cloudinary_1.handleUpload)(dataURI));
        });
        const uploadedImages = await Promise.all(promises);
        res.json(uploadedImages);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error uploading the file');
    }
};
exports.uploader = uploader;
