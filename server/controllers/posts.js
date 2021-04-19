import Post from '../models/post.js';
import User from '../models/user.js';
import mongoose from 'mongoose';
import fs from 'fs';

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
        creator: req.userId, 
        createdAt: new Date().toISOString() 
    })

    // Append Picture
    if(req.file){
        newPost.imageFile = url + '/uploads/posts/' + req.file.filename
    }

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const editPost = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const userId = req.userId;
    const post = req.body;

    try {
        // Check if the user is the owner...
        if(userId != post.creator){
            throw new Error("You cannot perform this action");
        }

        const oldPost = await Post.findById(post.id);
        if(!oldPost){
            throw new Error("Post not found!");
        }

        const newPost = { 
            ...post,
            tags: JSON.parse(post.tags), 
            creator: req.userId, 
            createdAt: new Date().toISOString(),
         };

        // Update Picture
        if(req.file){
            let oldImage = oldPost.imageFile.split('/').pop();
            fs.unlinkSync(`${process.cwd()}/uploads/posts/${oldImage}`);
            newPost.imageFile = url + '/uploads/posts/' + req.file.filename
        }

        const updatedPost = await Post.findByIdAndUpdate(post.id, newPost, { new: true });
        res.status(201).json(updatedPost);
        
    } catch (error) {
        res.status(500).json({ error });
    }

}

export const getTitles = async (req, res) => {
    try {
        const names = await Post.find({}, 'title');

        res.status(200).json(names);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const getPost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;

    try {
        Post.findOne({ _id: postId}).exec(async(err, post) => {
            if (post) {
                // Get Author
                const author = await User.findOne({ _id: post.creator}, 'name email profilePicture savedPosts');
                if (!author){
                    throw new Error("Author not found!");
                }

                // Check if author is blocked and post is saved
                let saved, blocked = false;
                if(userId){
                    const currentUser = await User.findOne({ _id: userId}, 'savedPosts blockedUsers');
                    if(!currentUser){
                        throw new Error ("User not found!");
                    }

                    saved = currentUser.savedPosts.includes(post._id);
                    blocked = currentUser.blockedUsers.includes(post.creator);
                    
                }
                res.status(200).json({ post: post, author: author, saved: saved, blocked: blocked });

            }else {
                res.status(404).json({ error: "Post not found!" });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const deletePost = async (req, res) => {
    const postId = req.params.id;

    Post.findByIdAndDelete(postId).then((post) => {
        res.status(201).json({ post: post });
    }).catch(error => {
        res.status(500).json({ message: error });
    });
}

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


export const savePost = async (req, res) => {
    const { postId } = req.body;

    if (!req.userId) {
        return res(403).json({ message: "Unauthorized" });
    }
    
    const user = await User.findById(req.userId);

    const index = user.savedPosts.findIndex((id) => id === String(postId));

    if (index === -1) {
      user.savedPosts.push(postId);
    } else {
        user.savedPosts = user.savedPosts.filter((id) => id !== String(postId));
    }
    User.findByIdAndUpdate(req.userId, user, { new: true }).then(() => {
        res.status(201).json({ message: 'Success!' });
    }).catch(error => {
        res.status(500).json({ message: error.message });
    });
}


export const getSavedPosts = async (req, res) => {
    const userId = req.userId;
    const page = req.params.page;
    const postsPerPage = 5;

    if(page < 0){
        throw new Error('Page Number Invalid');
    }

    if (!userId) {
        return res(403).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findById(userId);
        if (!user){
            throw new Error('Could\'nt find user');
        }

    
        const posts = await Post.find()
            .select('title description body name imageFile createdAt')
            .where('_id')
            .in(user.savedPosts.map(savedPost => mongoose.Types.ObjectId(savedPost)))
            .skip(postsPerPage * page)
            .limit(postsPerPage);

        
        const postsNumber = await Post.find().where('_id').in(user.savedPosts.map(savedPost => mongoose.Types.ObjectId(savedPost))).countDocuments();

        let limitReached = ((posts.length + (postsPerPage * page)) == postsNumber);

        res.status(200).json({ posts: posts, limitReached: limitReached });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}


export const reportPost = async (req, res) => {
    const { postId, reason, blockAuthor } = req.body;    

    
    try {
        const post = await Post.findById(postId);
        if (!post){
            throw new Error('Post Not Found');
        }

        // Check if post already reported
        let reported = post.reports.find(report => report.reporter === req.userId);
        if (reported) {
            res.status(406).json({ message: 'You\'ve already reported this post'});
            return;
        }

        post.reports.push({ reporter: req.userId, reason: reason });
        post.save().then(async () => {
            // Block User
            if (blockAuthor){
                let currentUser = await User.findById(req.userId);
                if (!currentUser) {
                    throw new Error("Could not find your account");
                }
                // Check if already blocked
                if(!currentUser.blockedUsers.includes(post.creator)){
                    currentUser.blockedUsers.push(post.creator);
                    await currentUser.save();
                    res.status(201).json({ message: 'Post reported and user blocked' });
                    return;
                }
            }
            res.status(201).json({ message: 'Post Reported' });
        }).catch(error => {
            res.status(400).json({ message: error.messsage });
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

export const reportAuthor = async (req, res) => {
    const { creator, reason, blockAuthor } = req.body;    
    
    try {
        const author = await User.findById(creator);
        if (!author){
            throw new Error('Author Not Found');
        }

        // Check if author already reported
        let reported = author.reports.find(report => report.reporter === req.userId);
        if (reported) {
            res.status(406).json({ message: 'You\'ve already reported this author'});
            return;
        }

        author.reports.push({ reporter: req.userId, reason: reason });
        author.save().then(async () => {
            // Block User
            if (blockAuthor){
                let currentUser = await User.findById(req.userId);
                if (!currentUser) {
                    throw new Error("Could not find your account");
                }
                // Check if already blocked
                if(!currentUser.blockedUsers.includes(author._id)){
                    currentUser.blockedUsers.push(author._id);
                    await currentUser.save();
                    res.status(201).json({ message: 'Author reported and user blocked' });
                    return;
                }
            }
            res.status(201).json({ message: 'Author Reported' });
        }).catch(error => {
            res.status(400).json({ message: error.messsage });
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 



export const blockAuthor = async (req, res) => {
    const { creator } = req.body;    
    
    try {
        // Block User
        let currentUser = await User.findById(req.userId);
        if (!currentUser) {
            throw new Error("Could not find your account");
        }
        // Check if already blocked
        if(!currentUser.blockedUsers.includes(creator)){
            currentUser.blockedUsers.push(creator);
            await currentUser.save();
            res.status(201).json({ message: 'Author blocked' });
        }else{
            res.status(406).json({ message: 'Author already blocked' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 


