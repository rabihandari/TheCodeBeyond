import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RegisterValidate from '../validation/register.js';
import LoginValidate from '../validation/login.js';

import { SECRET_OR_KEY } from '../config/config.js';
import e from 'express';

export const register = async (req, res) => {
    const { errors, isValid } = RegisterValidate(req.body);

    // Check if valid
    if (!isValid) {
        res.status(400).json(errors);
    }

    // Register if user doesn't exists
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.status(400).json({ email: 'Email already exists' });
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hashing the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => { res.status(201).json(user) })
                        .catch(err => { console.log(err.message) });
                });
            });
        }
    });
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
    User.findOne({ email: email }).then(user => {
        if (!user){
            return res.status(404).json({ emailnotfound: "Email not found" });
        }else{
            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                    };

                    // Sign JWT
                    jwt.sign(payload, SECRET_OR_KEY, { expiresIn: 60 }, (err, token) => {
                        res.cookie('jwt', token)
                        res.status(200).json({ success: true, token: "JWT " + token })
                    });
                }else{
                    return res.status(400).json({ passwordincorrect: "Password is incorrect" });
                }
            });
        }
    });
}

export const test = (req, res) => {
    const user = req.user;
    if(user){
        res.status(200).json(user);
    }else{
        res.status(403).json({ error: 'Permission Denied' });
    }
}