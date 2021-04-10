import Post from '../models/post.js';
import User from '../models/user.js';

export const getPosts = async (req, res) => {
    const filter = req.body;
    const page = req.params.page;
    const postsPerPage = 8;

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
        const posts = await Post.find({}, 'title name createdAt imageFile').sort({ likes: -1 }).limit(6);

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const post = req.body;

    const newPost = new Post({ 
        ...post,
        tags: JSON.parse(post.tags), 
        imageFile: url + '/uploads/posts/' + req.file.filename, 
        creator: req.userId, 
        createdAt: new Date().toISOString() 
    })

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
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
        Post.findOne({ _id: id}).exec(async(err, post) => {
            if (post) {
                // Get Publisher
                const user = await User.findOne({ _id: post.creator}, 'name email profilePicture');
                if (!user){
                    throw new Error("User not found!");
                }

                res.status(200).json({ post: post, user: user });
            }else {
                res.status(404).json({ error: "Post not found!" });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const getPublishedPosts = async (req, res) => {
    let id = req.userId;

    try {
        const posts = await Post.find({ creator: id }, 'title description createdAt');
        res.status(200).json({ posts: posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPublishedResponses = async (req, res) => {
    let id = req.userId;

    try {
        let responses = [];

        const user = await User.findById(id);
        if(!user) {
            throw new Error("User Not Found");
        }

        if(!user.responses) {
            res.status(201).json({ responses: [] });
            return;
        }


        for await (let response of user.responses){
            let post = await Post.findById(response.postId);
            let comment = post.comments.find(com => com._id == response.commentId);

            responses.push({
                postId: response.postId,
                commentId: response.commentId,
                title: comment.comment,
                createdAt: comment.createdAt,
            });
            
        }

        res.status(200).json({ responses: responses });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const likePost = async (req, res) => {
    const { id } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthorized" });
    }
    
    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    Post.findByIdAndUpdate(id, post, { new: true }).then(() => {
        res.status(201).json({ message: 'Success!' });
    }).catch(error => {
        res.status(500).json({ message: error.message });
    });
}

