import express from "express";
import { sendOTP, verifyOTP ,getAllUsers} from "../controllers/authemailController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/all",  getAllUsers);
export default router;
