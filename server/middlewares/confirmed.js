import User from '../models/user.js';

import { FRONTEND_HOST } from '../config/config.js';

const confirmed = async (req, res, next) => {
    let userId = req.userId;

    try {
        const user = await User.findById(userId, 'confirmed');
        if (!user) throw new Error ("User not found");

        if (!user.confirmed){
            res.confirmed = false;
            return res.status(406).json({ message: 'Your account is not activated yet!'});
        }
        
        next();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export default confirmed;