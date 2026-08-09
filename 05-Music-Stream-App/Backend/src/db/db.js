const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log(`Database Connection Error`, error);
    throw error;
  }
}

module.exports = connectDB;