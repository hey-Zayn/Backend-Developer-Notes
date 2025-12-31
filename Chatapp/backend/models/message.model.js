const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    sender: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiver: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

