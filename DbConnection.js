const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Load environment variables
const URL = process.env.URL;
mongoose.set("strictQuery", false);
// Connect to MongoDB
const connectDB = () => {
  try {
    mongoose.connect(URL);
    console.log("Database connected!");
  } catch (error) {
    console.error("Error connecting to database:", error);
    // You might want to handle errors differently depending on your application requirements
    // For example, you could throw the error to handle it elsewhere or perform some other action
    throw error;
  }
};

// Export the function to connect to the database
module.exports = connectDB;
