import User from '../models/user.js';
import Post from '../models/post.js';
import fs from 'fs';
import path from 'path';
import cloudinary from 'cloudinary'
import PasswordValidate from '../validation/passwordReset.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { BACKEND_HOST, EMAIL_SECRET } from '../config/config.js';
import { sendMail } from '../config/nodemailer.js';

export const userSettings = async (req, res) => {
    let userId = req.userId;

    if (!userId) {
        return res.status(200).json({});
    }

    try {
        const account = await User.findById(userId, 'createdAt confirmed blockedUsers');
        const security = await User.findById(userId, 'deactivated');
        if (!account || !security) throw new Error("User not found");


        res.status(200).json({ account: account, security: security });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const changeName = async (req, res) => {
    let userId = req.userId;
    let { name } = req.body;


    try {
        if (name.length === 0) throw new Error ("Please enter a valid name");

        const user = await User.findById(userId);
        if (!user) throw new Error("User Not Found");

        user.name = name;
        await user.save();

        res.status(201).json({ data: user.name, message: 'Name successfully updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const changeBio = async (req, res) => {
    let userId = req.userId;
    let { bio } = req.body;

    try {

        const user = await User.findById(userId);
        if (!user) throw new Error("User Not Found");

        user.bio = bio;
        await user.save();

        res.status(201).json({ data: user.bio, message: 'Bio successfully updated' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}

export const changeProfilePicture = async (req, res) => {
    let userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User Not Found");

        if(!req.file) throw new Error("Please upload an image");

        // Delete old picture
        if(user.profilePicture){
            let oldImage = user.profilePicture.split('/').pop();

            // Delete old image from cloudinary and locally...
            cloudinary.v2.uploader.destroy(oldImage.split('.')[0]);
            if(fs.existsSync(path.resolve(`${process.cwd()}/uploads/profile/${oldImage}`))){
                fs.unlinkSync(path.resolve(`${process.cwd()}/uploads/profile/${oldImage}`));
            }
        }

        // Add picture to cloudinary...
        cloudinary.v2.uploader.upload(process.cwd() + '/uploads/profile/' + req.file.filename, async (error, result) => {
            if (error) {
                throw new Error("Could not upload image to cloudinary");
            }

            user.profilePicture = result.url
            fs.unlinkSync(`${process.cwd()}/uploads/profile/${req.file.filename}`);

            await user.save();
            res.status(201).json({ data: user.profilePicture, message: "Profile picture successfully updated" });
        })
        

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}


export const changePassword = async (req, res) => {
    const { errors, isValid } = PasswordValidate(req.body);
    const { currentPassword, password1 } = req.body;
    let userId = req.userId;

    // Check if valid
    if (!isValid) {
        console.log(errors);
        res.status(400).json({ message: errors[0]});
        return;
    }

    try {

        const user = await User.findById(userId);
        if(!user) throw new Error ("User not found");

        // Check if current password is correct
        bcrypt.compare(currentPassword, user.password).then(isMatch => {
            if (!isMatch) throw new Error ("Incorrect Password");
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password1, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(newUser => { 
                            res.status(201).json({ success: true }) 
                        })
                        .catch(err => { console.log(err.message) });
                });
            });
        }).catch(error => {
            res.status(406).json({ message: error.message })
        });

    
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const changeEmail = async (req, res) => {
    let userId = req.userId;
    const { email } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        User.updateOne({ _id: userId }, { email: email, confirmed: false }).then(() => {
            const payload = {
                id: user.id,
            };
            jwt.sign(payload, EMAIL_SECRET, { expiresIn: '1d' }, (err, token) => {
                sendMail("Account Verification", email, `${BACKEND_HOST}/users/activation/${token}`, 'templates/accountActivation.html');
                res.status(201).json({ success: true, data: email }) 
            });
        }).catch(error => {
            res.status(406).json({ message: error.message });
        });

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getBlockedUsers = async(req, res) => {
    const { blockedUsersIds } = req.body;

    try {
        let users = [];

        for await(let id of blockedUsersIds){
            const user = await User.findById(id, 'name profilePicture');
            users.push(user);
        }

        res.status(201).json({ users })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const unblockUser = async (req, res) => {
    let userId = req.userId;
    const { id } = req.body;

    try {
        const user = await User.findById(userId, 'blockedUsers');
        if(!user) throw new Error ('User not found');

        user.blockedUsers = user.blockedUsers.filter(userid => userid !== id );
        await user.save();

        res.status(201).json({ success: true })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deactivateAccount = async (req, res) => {
    let userId = req.userId;

    try {
        const user = await User.findById(userId, 'deactivated');
        if(!user) throw new Error ('User not found');

        user.deactivated = true;
        await user.save();

        res.status(201).json({ success: true })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const reactivateAccount = async (req, res) => {
    let userId = req.userId;

    try {
        const user = await User.findById(userId, 'deactivated');
        if(!user) throw new Error ('User not found');

        user.deactivated = false;
        await user.save();

        res.status(201).json({ success: true })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteAccount = async (req, res) => {
    let userId = req.userId;

    try {
        await User.findByIdAndDelete(userId).then(async () => {
            await Post.deleteMany({ creator: userId }).then(() => {
                res.status(201).json({ message: "Account successfully deleted" });
            }).catch(error => {
                res.status(400).json({ message: "Could not delete posts" });
            });
        }).catch(() => {
            res.status(404).json({ message: "Could not delete account" });
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}