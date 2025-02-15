import multer from "multer";
import path from "path";
import { Response } from "./success.js"; // Custom response handler (optional)
import { ApiError } from "./errorHandlers.js"; // Custom error handler (optional)

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName); // Unique filename to prevent conflicts
  },
});

// Multer file filter (optional - allows only images)
const fileFilter = (req, file, cb) => {
    console.log(file)
    console.log("===================================")
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(ApiError.badRequest("Invalid file type! Only images and PDFs are allowed."), false);
  }
};

// Initialize Multer with storage and filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Controller for Single File Upload
export const uploadSingleFile = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    console.log(err)
    if (err) return next(err);
    if (!req.file) return next(ApiError.badRequest("No file uploaded!"));

    return Response(res, 200, "File uploaded successfully", { file: req.file });
  });
};

// Controller for Multiple Files Upload
export const uploadMultipleFiles = (req, res, next) => {
  upload.array("files", 5)(req, res, (err) => { // Allow up to 5 files
    if (err) return next(err);
    if (!req.files || req.files.length === 0) return next(ApiError.badRequest("No files uploaded!"));

    return Response(res, 200, "Files uploaded successfully", { files: req.files });
  });
};
