const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ routes
const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

// ✅ ADD AUTH ROUTES HERE (FIX)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("CRM Backend Running 🚀");
});

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// server (ALWAYS LAST)
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));