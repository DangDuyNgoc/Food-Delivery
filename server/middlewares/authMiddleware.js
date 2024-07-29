import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;

    if(!token) {
        return res.status(201).send({
            success: false,
            message: "Not Authorized Login"
        })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Server",
        })
    }
}

