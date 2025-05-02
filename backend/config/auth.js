import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config({ path: ".env" })
const isAuthenticated = async (req, res, next) => {

    const token = req.cookies.token
    if (!token) {

        return res.status(201).json({
            message: "User is not authenticated",
            success: false
        })
    }

    const decode = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log("docode in auth", decode)
    req.user = decode.id
    // console.log("decode = ", decode)
    next()
}

export default isAuthenticated