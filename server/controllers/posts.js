import Post from '../models/post.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    const filter = req.body;
    const page = req.params.page;
    const postsPerPage = 7;

    try {

        // Adding Keyword filter
        let keywordQuery = {};
        if(filter.keyword){
            if(filter.keyword.length > 0){
                keywordQuery = {
                   $or: [
                       {title: { $regex: filter.keyword, $options: 'i'}},
                       {description: { $regex: filter.keyword, $options: 'i'}}
                   ]
                };
            }
        }

        // Adding tag filter
        let tagsQuery = {};
        if(filter.tags){
            if (filter.tags.length > 0){
                tagsQuery = {tags: { $all: filter.tags }}; 
            }
        }

        // Merging filters
        let filterQuery = {
            $and: [
                keywordQuery,
                tagsQuery
            ]
        };
        const postsNumber = await Post.find(filterQuery).countDocuments();
        const posts = await Post
            .find(filterQuery, 'title description tags createdAt imageFile')
            .skip(page * postsPerPage)
            .limit(postsPerPage);
        
        res.status(200).json({posts: posts, pages: Math.ceil(postsNumber/postsPerPage)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPopularPosts = async (req, res) => {
    try {
        const posts = await Post.find({}, 'title creator createdAt imageFile').sort({ likeCount: -1 }).limit(3);

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


export const getTitles = async (req, res) => {
    try {
        const names = await Post.find({}, 'title');

        res.status(200).json(names);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        Post.findOne({ _id: id}).exec((err, post) => {
            if (post) {
                res.status(200).json({ post: post });
            }else {
                res.status(404).json({ error: err });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
