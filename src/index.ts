import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"))
  .catch(error => console.error("Error connecting to database:", error));

// Create an Express application
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to enable CORS
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});
// Define a route at /test which responds with a JSON message "Hello!"
app.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "Hello!" });
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Start the server on port 7000
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute );

