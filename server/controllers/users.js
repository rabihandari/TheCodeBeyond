import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import JsonWebTokenError from 'jsonwebtoken/lib/JsonWebTokenError.js';
import TokenExpiredError from 'jsonwebtoken/lib/TokenExpiredError.js';
import RegisterValidate from '../validation/register.js';
import LoginValidate from '../validation/login.js';
import PasswordValidate from '../validation/passwordReset.js';
import mongoose from 'mongoose';

import { BACKEND_HOST, FRONTEND_HOST, SECRET_OR_KEY, SECRET_OR_KEY2, EMAIL_SECRET, PASSWORD_SECRET } from '../config/config.js';
import { sendMail } from '../config/nodemailer.js';

export const register = async (req, res) => {
    const { errors, isValid } = RegisterValidate(req.body);

    // Check if valid
    if (!isValid) {
        res.status(400).json(errors);
    }

    // Register if user doesn't exists
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.status(400).json({ message: 'Email already exists' });
        }else{
            const newUser = new User({
                name: `${req.body.firstName} ${req.body.lastName}`,
                email: req.body.email,
                password: req.body.password
            });

            // Hashing the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => { 
                            const payload = {
                                id: user.id,
                            };
                            jwt.sign(payload, EMAIL_SECRET, { expiresIn: '1d' }, (err, token) => {
                                sendMail("Account Verification", req.body.email, `${BACKEND_HOST}/users/activation/${token}`, 'templates/accountActivation.html');
                                res.status(201).json({ success: true, result: user }) 
                            });
                        })
                        .catch(err => { console.log(err.message) });
                });
            });
        }
    });
}


export const registerOAuth = async (req, res) => {
    const { email, name, googleId, profilePicture } = req.body;

    try {
        const user = await User.findOne({ email: email });
        let payload = {
            id: googleId + 'abc',
        };

        // Check if user exists
        if(user){
            // Sign JWT...
            jwt.sign(payload, SECRET_OR_KEY, { expiresIn: '1m' }, (err, token) => {
                jwt.sign(payload, SECRET_OR_KEY2, { expiresIn: '1y' }, (err, token2) => {
                    res.cookie('token', token, { httpOnly: true, secure: true, expires: new Date(2147483647000), sameSite: 'none' });
                    res.cookie('refreshToken', token2, { httpOnly: true, secure: true, expires: new Date(2147483647000), sameSite: 'none' });
                    res.cookie('authType', 'google', { expires: new Date(2147483647000), secure: true, sameSite: 'none' });
                    res.status(201).json({ message: 'User exists!', user: user });
                });
            });
        }else{
            
            // Hashing the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(googleId, salt, (err, hash) => {
                    if (err) throw err;
                    let password = hash;
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(googleId + 'abc'),
                        name: name,
                        email: email,
                        password: password,
                        profilePicture: profilePicture,
                        confirmed: true
                    });
                    newUser.save().then(user => {
                        // Sign JWT
                        jwt.sign(payload, SECRET_OR_KEY, { expiresIn: '1m' }, (err, token) => {
                            jwt.sign(payload, SECRET_OR_KEY2, { expiresIn: '1y' }, (err, token2) => {
                                res.cookie('token', token, { httpOnly: true, secure: true, expires: new Date(2147483647000), sameSite: 'none' });
                                res.cookie('refreshToken', token2, { httpOnly: true, secure: true, expires: new Date(2147483647000), sameSite: 'none' });
                                res.cookie('authType', 'google', { expires: new Date(2147483647000), secure: true, sameSite: 'none' });
                                res.status(201).json({ message: 'User Created!', user: user });
                            });
                        });
                    }).catch(error => {
                        res.status(405).json({ message: error.message });
                    });
                });
            });

            
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

export const login = async (req, res) => {
    const { errors, isValid } = LoginValidate(req.body);
    const email = req.body.email;
    const password = req.body.password;

    // Check if valid
    if (!isValid) {
        res.status(400).json(errors);
    }

    // Check if user exists
    try {
        User.findOne({ email: email }, 'createdAt email name password profilePicture confirmed bio').then(user => {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // Check if activated
                    if (!user.confirmed){
                        res.status(401).json({ message: "Your account is not activated." })
                    }

                    const payload = {
                        id: user.id,
                    };


                    // Sign JWT
                    jwt.sign(payload, SECRET_OR_KEY, { expiresIn: '1m' }, (err, token) => {
                        jwt.sign(payload, SECRET_OR_KEY2, { expiresIn: '1y' }, (err, token2) => {
                            res.cookie('token', token, { httpOnly: true, secure: true, expires: new Date(2147483647000), sameSite: 'none' });
                            res.cookie('refreshToken', token2, { httpOnly: true, secure: true, expires: new Date(2147483647000), sameSite: 'none' });
                            res.cookie('authType', 'email', { expires: new Date(2147483647000),secure: true, sameSite: 'none' });
                            res.status(200).json({ result: user});
                        });
                    });
                }else{
                    res.status(400).json({ message: "Password is incorrect" });
                }
            });
        }).catch(() => {
            res.status(400).json({ message: "Email not found" });
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!"})
    }
}


export const logout = async (req, res) => {
    res.cookie('token', '', { httpOnly: true, secure: true, expires: new Date(0), sameSite: false });
    res.cookie('refreshToken', '', { httpOnly: true, secure: true, expires: new Date(0), sameSite: false });
    res.cookie('authType', '', { expires: new Date(0), sameSite: false });
    res.status(200).json({ success: true });
} 

export const activate = async (req, res) => {
    const token = req.params.token;

    try {
        const { id } = jwt.verify(token, EMAIL_SECRET);

        await User.updateOne({ "_id" :id }, { 'confirmed': true });
        
        res.redirect(`${FRONTEND_HOST}/login`);
    } catch (error) {
        if(error instanceof TokenExpiredError){
            res.redirect(`${FRONTEND_HOST}/login/activation/token-expired`);
        }else{
            res.status(500).json({ message: "Something went wrong!"})
        }
    }

}

export const resendActivation = async (req, res) => {
    const email = req.params.email;

    try {
        User.findOne({ email: email }).then(user => {
            const payload = {
                id: user.id,
            };
            jwt.sign(payload, EMAIL_SECRET, { expiresIn: '1d' }, (err, token) => {
                sendMail("Account Verification", email, `${BACKEND_HOST}/users/activation/${token}`, 'templates/accountActivation.html');
                res.status(201).json({ success: true }) 
            });
        }).catch(error => {
            res.status(404).json({ message: 'Email not found' });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}


export const requestPasswordReset = async (req, res) => {
    const email = req.params.email;

    try {
        User.findOne({ email: email }).then(user => {
            const payload = {
                id: user.id,
            };
            jwt.sign(payload, PASSWORD_SECRET, { expiresIn: '1d' }, (err, token) => {
                sendMail("Password Reset", email, `${FRONTEND_HOST}/login/reset-password/${email}/${token}`, 'templates/passwordReset.html');
                res.status(201).json({ success: true }) 
            });
        }).catch(error => {
            res.status(404).json({ message: 'Email not found' });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { errors, isValid } = PasswordValidate(req.body);
    const { token, password1 } = req.body;

    // Check if valid
    if (!isValid) {
        res.status(400).json(errors);
    }
    
    try {
        jwt.verify(token, PASSWORD_SECRET);

        let { id } = jwt.verify(token, PASSWORD_SECRET);

        User.findById(id).then(user => {
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
            res.status(404).json({ message: "Account not found"});
        });

    
    } catch (error) {
        if (error instanceof TokenExpiredError){
            res.status(401).json({ message: 'Your token has expired' });;
        }else if(error instanceof JsonWebTokenError){
            res.status(403).json({ message: 'Your token is not valid' });
        }else{
            res.status(500).json({ message: "Something went wrong!"})
        }
    }
}
 