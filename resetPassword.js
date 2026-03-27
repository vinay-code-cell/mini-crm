const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const resetPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const email = "test@example.com";
    const newPassword = "NewPassword123"; // Change this to your desired password

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("❌ User not found");
      process.exit(1);
    }

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // Update password
    await User.updateOne({ email: email.toLowerCase() }, { password: hashed });
    console.log(`✅ Password reset successfully for ${email}`);
    console.log(`📝 New password: ${newPassword}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

resetPassword();
