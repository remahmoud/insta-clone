import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import AuthRoutes from "./routes/auth.route";
import PostRoutes from "./routes/post.route";
import UserRoutes from "./routes/user.route";
import dbConnect from "./config/dbConnect";

dotenv.config();

// Database connection
dbConnect();

// Express app
const app = express();
const port = process.env.PORT || 5000;

// logger
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/users", UserRoutes);

// Server running
app.listen(port, () => console.log("Server is running! "));
