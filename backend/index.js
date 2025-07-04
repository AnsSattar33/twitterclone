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

const frontendUrl = process.env.FRONTEND_URL
const allowedOrigins = [
    'https://twitterclone-frontend-three.vercel.app',
    'http://localhost:5173',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Preflight request handler
app.options('*', cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

//api

// app.use("/", (_, res) => {
//     return res.send("API is working")
// });

app.use("/api/v1/user", userRoute)

app.use("/api/v1/tweet", tweetRoute)

app.use('*', (_, res) => {
    return res.status(404).json({
        success: false,
        message: "Not Found"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server listning to ${process.env.PORT}`)
})
