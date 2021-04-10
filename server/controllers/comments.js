import Post from '../models/post.js';
import { CommentSchema, ReplySchema } from '../models/comment.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const addComment = async (req, res) => {
    const { id, comment, publishToProfile } = req.body;

    if (!req.userId) {
        return res.json({ message: "Unauthorized" });
    }
    
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.findById(id);

    const Comment = mongoose.model('Comment', CommentSchema);
    const newComment = new Comment({
        creator: req.userId, 
        name: user.name,
        profilePicture: user.profilePicture,
        comment: comment,
        comments: [],
    });

    // Check if user wants to publish comment on his profile
    if (publishToProfile) {
        user.responses.push({ postId: post._id, commentId: newComment._id });
        await user.save();
    }

    post.comments.push(newComment);

    Post.findByIdAndUpdate(id, post, { new: true }).then(() => {
        res.status(201).json({ message: 'Success!', comment: newComment });
    }).catch(error => {
        res.status(500).json({ message: error.message });
    });
}


export const addReply = async (req, res) => {
    const { postId, commentId, reply } = req.body;

    if (!req.userId){
        return res.status(403).json({ message: "Unauthorized" });
    }
    
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post){
            throw new Error("Post not found");
        }

        post.comments.forEach(async (comment) => {
            if (comment._id == commentId){
                const Reply = mongoose.model('Reply', ReplySchema);
                const newReply = new Reply({
                    creator: req.userId, 
                    name: user.name,
                    profilePicture: user.profilePicture,
                    reply: reply, 
                });

                comment.replies.push(newReply);
                await post.save();

                res.status(201).json({ message: 'Success!', reply: newReply });
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteComment = async (req, res) => {
    const { postId, commentId } = req.body;


    if (!req.userId){
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post){
            throw new Error("Post not found");
        }

        const com = post.comments.find(comment => comment._id == commentId);
        if (!com) {
            throw new Error("Comment not found");
        }
        
        const user = await User.findById(req.userId);
        user.responses = user.responses.filter(response => response.commentId != com._id);
        await user.save();
        
        post.comments = post.comments.filter(comment => comment._id != commentId);
        Post.findByIdAndUpdate(postId, post, { new: true }).then(() => {
            res.status(201).json({ message: 'Success!' });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteReply = async (req, res) => {
    const { postId, commentId, replyId } = req.body;

    if (!req.userId){
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post){
            throw new Error("Post not found");
        }

        const index = post.comments.findIndex(comment => comment._id == commentId);
        
        if (index === -1) {
            throw new Error("Comment not found");
        }

        const comment = post.comments[index];
        
        comment.replies = comment.replies.filter(reply => reply._id != replyId);
        Post.findByIdAndUpdate(postId, post, { new: true }).then(() => {
            res.status(201).json({ message: 'Success!' });
        }).catch(error => {
            res.status(500).json({ message: error.message });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const editComment = async (req, res) => {
    const { postId, commentId, newComment } = req.body;

    if (!req.userId){
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("Post Not Found");
        }

        const comment = post.comments.find(com => com._id == commentId);

        comment.comment = newComment;
        post.save().then(() => {
            res.status(201).json({ newComment: comment });
        }).catch(error => {
            res.status(404).json({ message: 'Could not apply changes' })
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export const editReply = async (req, res) => {
    const { postId, commentId, replyId, newReply } = req.body;

    if (!req.userId){
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("Post Not Found");
        }

        const comment = post.comments.find(com => com._id == commentId);
        if (!comment) {
            throw new Error("Comment Not Found");
        }
        
        const reply = comment.replies.find(rep => rep._id == replyId);
        
        reply.reply = newReply;
        post.save().then(() => {
            res.status(201).json({ newReply: reply });
        }).catch(error => {
            res.status(404).json({ message: 'Could not apply changes' })
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


export const reportComment = async (req, res) => {
    const { postId, commentId, reason, blockAuthor } = req.body;    

    if (!req.userId){
        res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const post = await Post.findById(postId);
        if (!post){
            throw new Error('Post Not Found');
        }

        const comment = post.comments.find(com => com._id == commentId);
        if (!comment) {
            throw new Error("Comment Not Found");
        }

        // Check if comment already reported
        let reported = comment.reports.find(report => report.reporter === req.userId);
        if (reported) {
            res.status(406).json({ message: 'You\'ve already reported this comment'});
            return;
        }

        comment.reports.push({ reporter: req.userId, reason: reason });
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
                    res.status(201).json({ message: 'Comment reported and user blocked' });
                    return;
                }
            }
            res.status(201).json({ message: 'Comment Reported' });
        }).catch(error => {
            res.status(400).json({ message: error.messsage });
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const reportReply = async (req, res) => {
    const { postId, commentId, replyId, reason, blockAuthor } = req.body;    

    if (!req.userId){
        res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const post = await Post.findById(postId);
        if (!post){
            throw new Error('Post Not Found');
        }

        const comment = post.comments.find(com => com._id == commentId);
        if (!comment) {
            throw new Error("Comment Not Found");
        }

        const reply = comment.replies.find(rep => rep._id == replyId);
        if (!reply) {
            throw new Error("Reply Not Found");
        }

        // Check if reply already reported
        let reported = reply.reports.find(report => report.reporter === req.userId);
        if (reported) {
            res.status(406).json({ message: 'You\'ve already reported this reply'});
            return;
        }

        reply.reports.push({ reporter: req.userId, reason: reason });
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
                    res.status(201).json({ message: 'Comment reported and user blocked' });
                    return;
                }
            }
            res.status(201).json({ message: 'Comment Reported' });
        }).catch(error => {
            res.status(400).json({ message: error.messsage });
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}