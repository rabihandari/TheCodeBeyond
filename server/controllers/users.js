import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RegisterValidate from '../validation/register.js';
import LoginValidate from '../validation/login.js';

import { SECRET_OR_KEY } from '../config/config.js';

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
                        .then(user => { res.status(201).json({ success: true, result: user }) })
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
    try {
        User.findOne({ email: email }).then(user => {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                    };

                    // Sign JWT
                    jwt.sign(payload, SECRET_OR_KEY, { expiresIn: '1h' }, (err, token) => {
                        res.status(200).json({ result: user, token: token })
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
