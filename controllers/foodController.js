import FoodItem from '../models/FoodItem.js';
import Category from "../models/FoodCategoriesModel.js";



// export const createFoodItem = async (req, res) => {
//     try {
//       // Check if a file was uploaded
//       if (!req.file) {
//         return res.status(400).json({ msg: "Image upload is required" });
//       }
  
//       // Construct the image URL
//       const imageUrl = `/uploads/${req.file.filename}`;
  
//       // Ensure all required fields are provided
//       const { name, description, price, category, foodType, preparationTime, availability, ingredients } = req.body;
  
//       if (!name || !description || !price || !category || !foodType || !preparationTime) {
//         return res.status(400).json({ msg: "All fields are required" });
//       }
  
//       // Parse ingredients as an array if it comes as a string
//       const ingredientList = typeof ingredients === "string" ? ingredients.split(",") : ingredients;
  
//       // Create new food item
//       const foodItem = new FoodItem({
//         name,
//         description,
//         price,
//         category,
//         foodType,
//         preparationTime,
//         availability: availability === "true", // Convert string to boolean
//         ingredients: ingredientList,
//         imageUrl,
//         user: req.user.id, // Assuming user ID is stored in req.user from auth middleware
//       });
  
//       // Save food item to database
//       await foodItem.save();
  
//       return res.status(201).json({
//         msg: "Food item added successfully",
//         foodItem,
//       });
//     } catch (error) {
//       return res.status(500).json({ msg: "Server error", error: error.message });
//     }
//   };
// Get all food items
export const createFoodItem = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "Image upload is required" });
      }
  
      const imageUrl = `/uploads/${req.file.filename}`;
      const { name, description, price, category, foodType, preparationTime, availability, ingredients } = req.body;
  
      if (!name || !description || !price || !category || !foodType || !preparationTime) {
        return res.status(400).json({ msg: "All fields are required" });
      }
  
      // Check if the category exists
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ msg: "Invalid category ID" });
      }
  
      const ingredientList = typeof ingredients === "string" ? ingredients.split(",") : ingredients;
  
      const foodItem = new FoodItem({
        name,
        description,
        price,
        category, 
        foodType,
        preparationTime,
        availability: availability === "true",
        ingredients: ingredientList,
        imageUrl,
        user: req.user.id,
      });
  
      await foodItem.save();
  
      return res.status(201).json({
        msg: "Food item added successfully",
        foodItem,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Server error", error: error.message });
    }
  };
export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single food item by ID
export const getFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a food item by ID
export const updateFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json(foodItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a food item by ID
export const deleteFoodItemById = async (req, res) => {
  try {
    const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
