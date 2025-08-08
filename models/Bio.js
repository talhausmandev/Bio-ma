import mongoose from "mongoose";

const bioSchema = new mongoose.Schema({
  shortName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  links: {
    type: [String], // array of URLs
    required: true,
  },
  image: {
    type: String, // e.g., base64 string or image URL
    required: false,
  },
}, { timestamps: true });

// Prevent model overwrite on hot reloads
export default mongoose.models.Bio || mongoose.model("Bio", bioSchema);
