import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })
const databaseConnection = () => {

    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected To Mongodb")
    }).catch((err) => {
        console.log("err in database = ", err)
    })
}

export default databaseConnection