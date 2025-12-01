require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./src/util/db");
const SavedRoutes = require("./src/routes/saved.route");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB().catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err);
  process.exit(1);
});

// Static images folder
app.use("/Images", express.static("public/Images"));

// Routes
app.use("/api", SavedRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`✅ Saved service running on port ${PORT}`));

