import mongoose from 'mongoose';
import { CommentSchema } from './comment.js';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    body: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [CommentSchema], default: [] },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
