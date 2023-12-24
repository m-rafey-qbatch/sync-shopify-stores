import mongoose from "mongoose";

const scheema = new mongoose.Schema({
  id: {
    type: String,
  },
  shop: {
    type: String,
  },
  state: {
    type: Number,
  },
  isOnline: {
    type: Boolean,
  },
  scope: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.shopify_sessions || mongoose.model("shopify_sessions", scheema);
