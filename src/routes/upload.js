import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.js";
import {
  deleteImage,
  updateImage,
  uploadImage,
} from "../controllers/upload.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio-main",
    format: "png",
  },
});

const upload = multer({ storage: storage });
router.post(
  "/images/upload",
  upload.array("images", 10),
  authenticate,
  authorization,
  uploadImage
);
router.delete("/images/:id", deleteImage);
router.put(
  "/images/:id",
  upload.array("images", 10),
  authenticate,
  authorization,
  updateImage
);
export default router;
