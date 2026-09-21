import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

import { notFound, ErrorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Connect to MongoDB
connectDB();

// Create an instance of the Express application
const app = express();

// Define the port number
const PORT = process.env.PORT || 5000;

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/products", productRoutes);

app.use(ErrorHandler);
app.use(notFound);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
