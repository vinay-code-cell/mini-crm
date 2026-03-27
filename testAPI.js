const axios = require("axios");

const testAPI = async () => {
  try {
    console.log("🔄 Testing login API...\n");
    
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: "test@example.com",
      password: "NewPassword123"
    });

    console.log("✅ Login successful!");
    console.log("Token:", response.data.token);
  } catch (error) {
    console.log("❌ Error:");
    if (error.response) {
      console.log("   Status:", error.response.status);
      console.log("   Message:", error.response.data);
    } else if (error.request) {
      console.log("   No response from server");
      console.log("   Make sure backend is running on port 5000");
    } else {
      console.log("   Error:", error.message);
    }
  }
};

testAPI();
