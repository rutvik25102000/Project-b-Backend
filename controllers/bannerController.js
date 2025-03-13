import Banner from "../models/BannerModel.js";

// Upload a new banner
export const uploadBanner = async (req, res) => {
    try {
      console.log("Received Form Data:", req.body);
      console.log("Received File:", req.file);
  
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }
      const userId = req.user ? req.user.id : req.body.createdBy; 
      if (!userId) {
        return res.status(400).json({ message: "User ID (createdBy) is required" });
      }
      const { title, description, status, displayOrder, startDate, endDate, createdBy } = req.body;
  
      const newBanner = new Banner({
        title,
        description,
        imageUrl: `/uploads/${req.file.filename}`,
        status: status || "active",
        displayOrder: displayOrder || 0,
        startDate: startDate || null,
        endDate: endDate || null,
        createdBy:userId ,
      });
  
      await newBanner.save();
  
      res.status(201).json({ message: "Banner uploaded successfully", banner: newBanner });
    } catch (error) {
      console.error("Error uploading banner:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  

// Get all banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a banner
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    await Banner.findByIdAndDelete(id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get a banner by ID
export const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update a banner by ID
export const updateBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, displayOrder, startDate, endDate, createdBy } = req.body;

    let updatedData = {
      title,
      description,
      status,
      displayOrder,
      startDate,
      endDate,
      createdBy,
    };

    // If an image is uploaded, update the image URL
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner updated successfully", banner: updatedBanner });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const updateBannerStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["active", "inactive"].includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
      }

      const banner = await Banner.findByIdAndUpdate(id, { status }, { new: true });

      if (!banner) {
          return res.status(404).json({ message: "Banner not found" });
      }

      res.status(200).json({ message: "Status updated successfully", banner });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};