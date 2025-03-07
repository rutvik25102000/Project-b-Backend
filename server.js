import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/userRoutes.js'
import foodRoutes from './routes/foodRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import bannerRoutes from "./routes/bannerRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static("uploads"));
app.use('/api/auth',authRoutes);
app.use('/api/fooditem',foodRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/banners", bannerRoutes);

const PORT = process.env.PORT ||5000 ;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
