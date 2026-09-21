import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import users from "./data/user.js";
import products from "./data/products.js";

import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    // Delete all data from the database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert data into the database
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log("Data Created");
    // Exit the process after seeding
    process.exit();
  } catch (error) {
    // Log the error and exit the process with a failure code
    console.error(error);
    process.exit(1);
  }
};

const DestroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  DestroyData();
} else {
  importData();
}
