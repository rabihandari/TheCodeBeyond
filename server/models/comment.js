import mongoose from 'mongoose';

export const ReplySchema = mongoose.Schema({
    profilePicture: String,
    name: String,
    creator: String,
    reply: String,
    reports: {
        type: [{
            reporter: String,
            reason: String,
        }],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const CommentSchema = mongoose.Schema({
    creator: String,
    profilePicture: String,
    name: String,
    comment: String,
    reports: {
        type: [{
            reporter: String,
            reason: String,
        }],
        default: [],
    },
    replies: {
        type: [ReplySchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});