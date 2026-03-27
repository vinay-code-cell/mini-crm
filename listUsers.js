const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const users = await User.find({});
    console.log("\n📋 Users in database:");
    if (users.length === 0) {
      console.log("   No users found");
    } else {
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. Email: ${user.email}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

listUsers();
