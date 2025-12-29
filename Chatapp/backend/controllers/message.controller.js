const User = require('../models/user.model')
const Message = require('../models/message.model')
const cloudinary = require('../lib/cloudinary')


// get Sidebar users ---- GET users

const GetUsers = async (req, res) => {
    try {
        const LoggedInUser = req.user;
        const users = await User.find({ _id: { $ne: LoggedInUser._id } }).select("-password");
        if (!users) {
            return res.status(400).json({
                success: false,
                message: "Users Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Users Found",
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}

const GetMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user_id;
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        })
        res.status(200).json({
            success: true,
            message: "Messages Found",
            messages
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}

const SendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message, media } = req.body;
        const senderId = req.user_id;

        let imageUrl;
        if (media) {
            const result = await cloudinary.uploader.upload(media, {
                folder: "chatapp",
                resource_type: "auto"
            })
            imageUrl = result.secure_url;
        }

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            message,
            media: imageUrl
        })
        await newMessage.save();

        // TODO : IMPLEMENT SOCKET IO TO SEND MESSAGES FOR REAL TIME CHAT...

        res.status(200).json({
            success: true,
            message: "Message Sent",
            newMessage
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}





module.exports = {
    GetUsers,
    GetMessages,
    SendMessage
}