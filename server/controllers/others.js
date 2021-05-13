import FeedbackValidator from '../validation/feedback.js';
import Request from '../models/requests.js';
import Post from '../models/post.js';
import User from '../models/user.js';
import { sendFeedback as sendFeed, sendAnswer } from '../config/nodemailer.js';
import { FRONTEND_HOST } from '../config/config.js';

export const sendFeedback = async (req, res) => {
    const { errors, isValid } = FeedbackValidator(req.body);
    const { fullName, email, subject, body } = req.body;

    if (!isValid){
        return res.status(401).json({ messages: Object.values(errors) })
    }

    try {
        sendFeed(fullName, email, subject, body);
        res.status(201).json({ message: 'Successfully sent email' });
        
    } catch (error) {
        res.status(500).json({ messages: [error.message] });
    }

}


export const getAllRequests = async (req, res) => {
    const filter = req.body;
    const page = req.params.page;
    const requestsPerPage = 12;
    
    
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
                tagsQuery = { tags: { $all: filter.tags } }; 
            }
        }

        // Adding not answered filter
        let notAnsweredQuery = {};
        if(filter.notAnswered){
            notAnsweredQuery = { answers: { $size: 0 } }; 
        }

        // Merging filters
        let filterQuery = {
            $and: [
                keywordQuery,
                tagsQuery,
                notAnsweredQuery
            ]
        };

        const requestsNumber = await Request.find(filterQuery).countDocuments();
        const requests = await Request
            .find(filterQuery, 'title description creator tags createdAt answers')
            .skip(page * requestsPerPage)
            .limit(requestsPerPage);

            
        let limitReached = ((requests.length + (requestsPerPage * page)) == requestsNumber);
        
        res.status(200).json({requests: requests, limitReached: limitReached, resultNumber: requestsNumber});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getRequests = async (req, res) => {
    try {
        const postRequests = await Request.find().sort('-createdAt').limit(3);

        res.status(200).json({ posts: postRequests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getUserRequests = async (req, res) => {
    const userId = req.userId;

    try {
        const postRequests = await Request.find({ 'creator.id': userId }).sort('-createdAt');

        res.status(200).json({ posts: postRequests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getRequest = async (req, res) => {
    const id = req.params.id;

    try {
        const postRequest = await Request.findById(id);
        if(!postRequest) throw new Error ("Post Request not found");

        res.status(200).json({ postRequest });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getRequestPosts = async (req, res) => {
    const userId = req.userId;
    const { postIds } = req.body;

    try {
        const posts = await Post.find({ _id: { $in: postIds } }, 'title description imageFile name createdAt');

        res.status(201).json({ posts });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
} 


export const addRequest = async(req, res) => {
    const userId = req.userId;
    const { title, description, tags, questions } = req.body;

    try {
        const user = await User.findById(userId);
        if(!user) throw new Error ("User not found!");


        const postRequest = new Request({
            title: title,
            description: description,
            tags: tags,
            questions: questions,
            creator: {
                id: userId,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });
        
        await postRequest.save();
        res.status(201).json({ message: 'Request Created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const addAnswer = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const post = req.body;

    const newPost = new Post({ 
        ...post,
        tags: JSON.parse(post.tags), 
        creator: req.userId, 
        createdAt: new Date().toISOString(),
        answerTo: post.requestId
    })

    // Append Picture
    if(req.file){
        newPost.imageFile = url + '/uploads/posts/' + req.file.filename
    }

    try {
        let requestId = post.requestId;
        const postRequest = await Request.findById(requestId);
        if(!postRequest) throw new Error ("Post Request not found");

        postRequest.answers.push(newPost._id);

        let p1 = newPost.save();
        let p2 = postRequest.save();
        
        Promise.all([p1, p2]).then(() => {
            let email = post.requestEmail;
            let postLink = `${FRONTEND_HOST}/${newPost._id}/${newPost.title}`;
            sendAnswer("You have an answer", email, postLink, 'templates/answerTemplate.html', post.requestTitle, post.name);
            res.status(201).json({ success: true })
        }).catch(error => {
            res.status(405).json({ message: error.message });
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}