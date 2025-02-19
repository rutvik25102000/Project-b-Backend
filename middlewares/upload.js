import multer from "multer";
import path from "path";

// Set storage engine
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads will be stored in "uploads" folder
  },
  filename: function (req, file, cb) {
    // Rename file to ensure uniqueness by using timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter - only accept images
export const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and JPG files are allowed"), false);
  }
};

// Multer upload instance
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter
});


