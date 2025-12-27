const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.header("Authorization")
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}

module.exports = { AuthMiddleware };
