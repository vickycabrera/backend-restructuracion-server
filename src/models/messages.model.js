import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    user: String,
    message: String
})

export const MessageModel = mongoose.model("messages", messageModel)