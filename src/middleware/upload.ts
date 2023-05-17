import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (process.env.NODE_ENV === "production") {
            cb(null, "uploads/");
        } else {
            cb(null, "client/public/uploads/");
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// multer file filter
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(
        new Error(
            "File upload only supports the following filetypes - " + filetypes
        )
    );
};

// multer upload
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

export default upload;
