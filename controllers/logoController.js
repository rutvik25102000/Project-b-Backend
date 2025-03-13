import Logo from "../models/logoModel.js";

// Upload Logo
export const uploadLogo = async (req, res) => {
  try {
    console.log("Received Form Data:", req.body);
    console.log("Received File:", req.file);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    const userId = req.user ? req.user.id : req.body.createdBy; 
    
    if (!userId) {
      return res.status(400).json({ message: "User ID (createdBy) is required" });
    }
    const {status,usageType,isDeleted,createdBy} = req.body;

    const newLogo = new Logo({
      
      usageType,
      isDeleted,
      logoUrl: `/uploads/${req.file.filename}`,
        status: status || "active",
        createdBy:userId ,
    });

    await newLogo.save();
    res.status(201).json({ success: true, message: "Logo uploaded successfully", logo: newLogo._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Active Logo by Usage Type
export const getActiveLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne({ usageType: req.params.usageType, isActive: true, isDeleted: false });

    if (!logo) {
      return res.status(404).json({ success: false, message: "No active logo found" });
    }

    // Convert binary data to base64
    const base64Image = `data:${logo.contentType};base64,${logo.logoData.toString("base64")}`;

    res.status(200).json({ success: true, logo: base64Image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Logos
export const getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find();
    res.status(200).json(logos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Soft Delete Logo
export const deleteLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLogo = await Logo.findByIdAndDelete(id);
    if (!deletedLogo) {
        return res.status(404).json({ message: "Logo not found" });
    }
    res.json({ message: "Logo deleted successfully" });
} catch (error) {
    console.error("Error deleting logo:", error);
    res.status(500).json({ message: "Server error", error });
}
};

export const getLogoById = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = await Logo.findById(id);

    if (!logo) {
      return res.status(404).json({ message: "logo not found" });
    }

    res.status(200).json(logo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, usageType } = req.body;

    // Check if the logo exists
    const logo = await Logo.findById(id);
    if (!logo) {
      return res.status(404).json({ message: "Logo not found" });
    }

    // Update fields
    if (status) logo.status = status;
    if (usageType) logo.usageType = usageType;

    // Check if a new image is provided
    if (req.file) {
      logo.logoUrl = `/uploads/${req.file.filename}`;
    }

    // Save the updated logo
    await logo.save();
    res.status(200).json({ message: "Logo updated successfully", logo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export const updateLogoStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["active", "inactive"].includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
      }

      const logo = await Logo.findByIdAndUpdate(id, { status }, { new: true });

      if (!logo) {
          return res.status(404).json({ message: "logo not found" });
      }

      res.status(200).json({ message: "Status updated successfully", logo });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};