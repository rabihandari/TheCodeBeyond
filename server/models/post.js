import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    body: String,
    creator: String,
    tags: [String],
    imageFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;