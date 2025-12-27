const jwt = require("jsonwebtoken");


const User = require("../Models/User.Model");



const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const user = await User.create({ name, email, password });
        await user.save();
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server Errror",
            error: err.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // find the user
        const user = await User.findOne({ email })
        // if not found return error
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        // if found compare the password
        const isPasswordMatched = await user.comparePassword(password);
        // if not match return error
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        // Create token
        const token = jwt.sign({ id: user._id, username: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        // return success
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server Errror",
            error: err.message
        })
    }
}


module.exports = {
    register,
    login
}