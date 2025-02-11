import mongoose from "mongoose";

// Schema definition
const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Complaint title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Complaint description is required"],
    trim: true,
  },
  opinion: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Assumes you have a User model
    required: [true, "User ID is required"], // ✅ Ensures a user is linked
    index: true, // ✅ Improves query performance
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Rejected"], // ✅ Restricts values
    default: "Pending", // ✅ Sets default status
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create model
const ComplaintModel = mongoose.model("Complaint", complaintSchema)
export default ComplaintModel;
