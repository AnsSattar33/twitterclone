import express from "express"
import dotenv from "dotenv"
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
import cors from "cors"
const app = express();
databaseConnection();

dotenv.config({ path: ".env" })

const allowedOrigins = [
    "http://localhost:5173",
    "https://twitterclone-frontend-five.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};
//Middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(cors(corsOptions));
//api

app.use("/api/v1/user", userRoute)

app.use("/api/v1/tweet", tweetRoute)


app.listen(process.env.PORT, () => {
    console.log(`Server listning to ${process.env.PORT}`)
})