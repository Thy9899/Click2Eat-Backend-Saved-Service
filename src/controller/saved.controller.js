const Saved = require("../models/saved.model");

// ───────────────────────────────
// GET ALL saved for one user
// ───────────────────────────────
// const GetAll = async (req, res) => {
//   try {
//     const customer_id = req.customer.customer_id;

//     const list = await Saved.find({ customer_id }).sort({ _id: -1 });

//     res.json({ success: true, list });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const GetAll = async (req, res) => {
  try {
    const customer_id = req.customer.customer_id;

    const list = await Saved.find({ customer_id }).sort({ _id: -1 });

    const normalized = list.map((item) => ({
      saved_id: item._id.toString(),
      customer_id: item.customer_id,
      product_id: item.product_id,
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
    }));

    res.json({ success: true, list: normalized });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ───────────────────────────────
// CREATE saved item
// ───────────────────────────────
const create = async (req, res) => {
  try {
    const customer_id = req.customer.customer_id;

    const { name, category, price, product_id } = req.body;
    let image = null;

    // If uploaded file exists → use filename
    if (req.file) {
      image = req.file.filename;
    }
    // If request contains a string URL for image
    else if (req.body.image) {
      image = req.body.image; // store external URL
    }

    if (!name || !category || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const savedItem = await Saved.create({
      customer_id,
      product_id,
      name,
      category,
      price,
      image,
    });

    res.status(201).json({
      success: true,
      saved_id: savedItem._id.toString(),
      customer_id,
      product_id,
      name: savedItem.name,
      category: savedItem.category,
      price: savedItem.price,
      image: savedItem.image,
    });
  } catch (err) {
    console.error("Error creating saved:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ───────────────────────────────
// UPDATE saved item
// ───────────────────────────────
const update = async (req, res) => {
  try {
    const customer_id = req.customer.customer_id;
    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Saved.findOneAndUpdate(
      { _id: id, customer_id },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Item not found or unauthorized" });
    }

    res.json({ success: true, updated });
  } catch (err) {
    console.error("Error updating:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ───────────────────────────────
// DELETE saved item
// ───────────────────────────────
const remove = async (req, res) => {
  try {
    const customer_id = req.customer.customer_id;
    const { id } = req.params;

    const deleted = await Saved.findOneAndDelete({ _id: id, customer_id });

    if (!deleted) {
      return res.status(404).json({ error: "Item not found or unauthorized" });
    }

    res.json({ success: true, deletedId: id });
  } catch (err) {
    console.error("Error deleting:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { GetAll, create, update, remove };
