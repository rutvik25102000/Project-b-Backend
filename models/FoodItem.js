import mongoose from 'mongoose';

// Define the food item schema
const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  imageUrl: { type: String, required: false },
  ingredients: [{ type: String, required: true }],
  availability: { type: Boolean, default: true },
  preparationTime: { type: Number, required: true },
  foodType: {
    type: String,
    required: true,
    enum: ['Veg', 'Non-Veg'],
  },
}, { timestamps: true });

// Export using ES Modules
const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem;  // ✅ Change to default export


