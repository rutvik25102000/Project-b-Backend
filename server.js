import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/userRoutes.js'
import foodRoutes from './routes/foodRoutes.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static("uploads"));
app.use('/api/auth',authRoutes);
app.use('/api/fooditem',foodRoutes);

const PORT = process.env.PORT ||5000 ;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
