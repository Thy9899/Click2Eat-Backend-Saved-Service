const mongoose = require("mongoose");

const SavedSchema = new mongoose.Schema(
  {
    // saved_id: {
    //   type: Number,
    //   required: true,
    // },
    customer_id: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

module.exports = mongoose.model("Saved", SavedSchema);
