const express = require("express");
const { Product, PRODUCT_CATEGORIES } = require("../models/Product");

const router = express.Router();

async function seedIfEmpty() {
  try {
    const count = await Product.countDocuments();
    if (count > 0) return;

    const sampleProducts = [
      {
        name: "Fresh Tomatoes",
        price: 199,
        oldPrice: 249,
        category: "Vegetables",
        isActive: true,
        description: "Juicy red tomatoes ideal for salads and cooking.",
      },
      {
        name: "Baby Spinach",
        price: 250,
        oldPrice: 299,
        category: "Vegetables",
        isActive: true,
        description: "Tender baby spinach leaves, washed and ready to eat.",
      },
      {
        name: "Almond Mix",
        price: 475,
        oldPrice: 525,
        category: "Fruits & Nuts",
        isActive: true,
        description: "Premium roasted almonds with a light salt seasoning.",
      },
      {
        name: "Greek Yoghurt",
        price: 310,
        oldPrice: 350,
        category: "Dairy & creams",
        isActive: true,
        description: "Thick and creamy Greek-style yoghurt.",
      },
      {
        name: "Cheddar Cheese Block",
        price: 425,
        oldPrice: 499,
        category: "Dairy & creams",
        isActive: true,
        description: "Mature cheddar cheese, full flavour.",
      },
      {
        name: "Breakfast Cereal Pack",
        price: 360,
        oldPrice: 399,
        category: "Packages Food",
        isActive: true,
        description: "Wholegrain cereal with honey clusters.",
      },
      {
        name: "Basmati Rice 5kg",
        price: 890,
        oldPrice: 950,
        category: "Staples",
        isActive: true,
        description: "Long-grain aromatic basmati rice.",
      },
      {
        name: "Wheat Flour 2kg",
        price: 320,
        oldPrice: 360,
        category: "Staples",
        isActive: true,
        description: "Refined wheat flour suitable for baking and cooking.",
      },
    ];

    await Product.insertMany(sampleProducts);
    console.log("✅ Seeded initial sample products");
  } catch (err) {
    console.error("Error seeding products:", err);
  }
}

seedIfEmpty();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products, categories: PRODUCT_CATEGORIES });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, oldPrice, category, isActive, description } = req.body;

    if (!name || price === undefined || price === null || !category) {
      return res.status(400).json({ message: "Name, price and category are required" });
    }

    const product = new Product({
      name,
      price,
      oldPrice,
      category,
      isActive: isActive !== undefined ? isActive : true,
      description,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, oldPrice, category, isActive, description } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        oldPrice,
        category,
        isActive,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;