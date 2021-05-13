import mongoose from 'mongoose';

const requestSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: []
    },
    questions: {
        type: [String],
        default: []
    },
    creator: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: ""
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    answers: {
        type: [String],
        default: []
    }
});

const Request = mongoose.model("Request", requestSchema);
export default Request;