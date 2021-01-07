import Post from '../models/post.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    const filter = req.body;
    const page = req.params.page;
    const postsPerPage = 7;

    try {
        let filterQuery = {};
        if(filter.tags){
            if (filter.tags.length > 0){
                filterQuery.tags = { $all: filter.tags }; 
            }
        }

        const postsNumber = await Post.find(filterQuery).countDocuments();
        const posts = await Post
            .find(filterQuery)
            .skip(page * postsPerPage)
            .limit(postsPerPage);
        
        res.status(200).json({posts: posts, pages: Math.ceil(postsNumber/postsPerPage)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPopularPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ likeCount: -1 }).limit(3);

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    
    const newPost = new Post(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

