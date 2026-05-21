import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import hotelsRouter from "./routes/hotels.js";
import roomsRouter from "./routes/rooms.js";

// CONFIG
dotenv.config();

const app = express();

// FIX FOR __dirname IN ES MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================
// MONGODB CONNECTION
// ==========================
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully ✅");
  } catch (error) {
    console.log("MongoDB Connection Error ❌");
    console.log(error);
  }
};

// ==========================
// MIDDLEWARE
// ==========================
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://lux-stay-i6dwuf3ke-thami-s-projectsmilli.vercel.app"
    ],
    credentials: true,
  })
);
// ==========================
// API ROUTES
// ==========================
app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.use("/api/hotels", hotelsRouter);

app.use("/api/rooms", roomsRouter);

// ==========================
// TEST ROUTE
// ==========================
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

// ==========================
// ROOT ROUTE
// ==========================
app.get("/", (req, res) => {
  res.send("LuxStay Backend Running Successfully 🚀");
});

// ==========================
// SERVE REACT FRONTEND
// ==========================
const clientPath = path.join(__dirname, "../client/build");

app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ==========================
// ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;

  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectMongoDB();

  console.log(`Server running on port ${PORT} 🚀`);
});