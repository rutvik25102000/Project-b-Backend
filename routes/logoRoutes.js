import express from "express";
import { upload } from "../middlewares/upload.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { 
  uploadLogo, 
  getActiveLogo, 
  getAllLogos, 
  getLogoById, 
  updateLogo, 
  updateLogoStatus, 
  deleteLogo 
} from "../controllers/logoController.js";

const router = express.Router();

router.post("/upload", authenticate, upload.single("image"), uploadLogo);
router.get("/active/:usageType", getActiveLogo);
router.get("/all", authenticate, getAllLogos);
router.get("/:id", authenticate, getLogoById);
router.put("/update-logo/:id", authenticate, upload.single("image"), updateLogo);
router.put("/update-status/:id", authenticate, updateLogoStatus);
router.delete("/delete/:id", authenticate, deleteLogo);

export default router;
