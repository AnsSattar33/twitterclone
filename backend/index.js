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

// const corsOptions = {
//     origin: 'http://localhost:5173', 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,           
//     optionSuccessStatus: 200
// }
//Middleware

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5173', 'https://twitterclone-frontend-beta.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    withCredentials: true,
}));
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
