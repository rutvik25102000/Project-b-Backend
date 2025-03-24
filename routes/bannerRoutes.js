import express from "express";
import { upload } from '../middlewares/upload.js';
import { uploadBanner, getAllBanners, getBannerById, updateBannerById, deleteBanner, updateBannerStatus,getActiveBanners } from "../controllers/bannerController.js";
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/upload", authenticate, upload.single("image"), uploadBanner);
router.get("/all", getAllBanners);
router.delete("/delete/:id", deleteBanner);
router.get("/:id", authenticate, getBannerById);
router.put("/:id", authenticate, upload.single("image"), updateBannerById);
router.put("/update-status-banner/:id", updateBannerStatus);
router.post("/active", getActiveBanners);

export default router;
