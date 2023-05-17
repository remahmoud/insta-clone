import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => console.log("Server is running!"));