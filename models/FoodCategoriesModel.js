import mongoose from 'mongoose';

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
}, { timestamps: true });

// Export the Category model
const Category = mongoose.model('Category', categorySchema);
export default Category;
