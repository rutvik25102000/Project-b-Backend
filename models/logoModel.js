import mongoose from 'mongoose';

const logoSchema = new mongoose.Schema(
  {
    logoUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    usageType: {
      type: String,
      enum: ["website-admin","website", "mobile", "invoice", "email", "other"], 
      required: true,
    },
   
    isDeleted: {
      type: Boolean,
      default: false, 
    }, 
    createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", 
          required: true,
        },
  },
  { timestamps: true }
);


const logo = mongoose.model('Logo', logoSchema);
export default logo; 

