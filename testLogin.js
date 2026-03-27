const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const email = "test@example.com";
    const password = "NewPassword123";

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log("❌ User not found in database");
      process.exit(1);
    }

    console.log("✅ User found");
    console.log(`   Email: ${user.email}`);
    console.log(`   Has password hash: ${!!user.password}`);

    if (!user.password) {
      console.log("❌ User has no password hash!");
      process.exit(1);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      console.log("✅ Password matches!");
    } else {
      console.log("❌ Password does NOT match");
      console.log(`   You entered: ${password}`);
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

testLogin();
