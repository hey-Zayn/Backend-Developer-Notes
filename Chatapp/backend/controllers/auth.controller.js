const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const genrateToken = require('../utils/utils');
const cloudinary = require('../lib/cloudinary');


const register = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        if (!email || !fullName || !password) {
            return res.status(400).json({
                success: false,
                message: "All Input are required"
            })
        }


        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }
        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            fullName,
            password: hashpassword
        })

        if (newUser) {
            genrateToken(newUser._id, res)
            await newUser.save();

            res.status(200).json({
                success: true,
                message: "User Registered Successfully",
                user: newUser
            })
        }


    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Input are required"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        genrateToken(user._id, res)
        res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err
        })
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User Logged Out Successfully"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err
        })
    }
}

const updateProfile = async (req, res) => {
    const { fullName, profilePic } = req.body;
    const userId = req.user._id;


    try {
        console.log("updateProfile called with:", { fullName, userId });
        if (!profilePic) {
            return res.status(400).json({
                success: false,
                message: "Profile Picture is required"
            })
        }

        console.log("Uploading to cloudinary...");
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "profile_pics",
        })
        console.log("Cloudinary upload successful:", uploadResponse.secure_url);

        const updateData = {};
        if (fullName) updateData.fullName = fullName;
        if (uploadResponse.secure_url) updateData.profilePic = uploadResponse.secure_url;

        console.log("Updating user in database...");
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true })

        if (!updatedUser) {
            console.log("User not found for update:", userId);
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }
        console.log("User updated successfully:", updatedUser._id);
        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user: updatedUser
        })
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || error
        })
    }
}


const checkAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User Authenticated Successfully",
            user: req.user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}

module.exports = { register, login, logout, updateProfile, checkAuth }