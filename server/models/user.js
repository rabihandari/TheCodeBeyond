import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    responses: {
        type: [{
            postId: String,
            commentId: String
        }],
        default: []
    },
    savedPosts: {
        type: [String],
        default: []
    },
    reports: {
        type: [{
            reporter: String,
            reason: String,
        }],
        default: [],
    },
    blockedUsers: {
        type: [String],
        default: []
    }
});

const User = mongoose.model("User", userSchema);

export default User;