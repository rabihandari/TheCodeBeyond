import FeedbackValidator from '../validation/feedback.js';
import { sendFeedback as sendFeed } from '../config/nodemailer.js';

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