const { Schema, model } = require("mongoose");

const PRODUCT_CATEGORIES = [
  "Vegetables",
  "Fruits & Nuts",
  "Dairy & creams",
  "Packages Food",
  "Staples",
];

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: PRODUCT_CATEGORIES,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Product: model("Product", productSchema),
  PRODUCT_CATEGORIES,
};