const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\=])(?=.{8,})");

const verifyUsername = function(username) {
    return username.length > 0 && username.length <= 30;
}

const verifyPassword = function(password) {
    return strongPasswordRegex.test(password);
}

exports.getAuthToken = function(req, res, next) {
    const data = req.body;
    let username = data.username;
    const password = data.password;
    
    if (!username || !password) {
        return res.status(500).json({
            error: true,
            message: 'Missing required fields'
        });
    }

    username = username.toLowerCase();
    User.findOne({ username: username })
        .exec()
        .then(function(doc) {
            if (doc) {
                bcrypt.compare(password, doc.password, function(error, result) {
                    if (error || !result) {
                        res.status(401).json({
                            message: 'Authentication failed'
                        });
                    }
                    else {
                        const jwtToken = jwt.sign(
                            {
                                username: username
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: '1h'
                            }
                        );
                        res.status(200).json({
                            message: 'Authentication successful',
                            token: jwtToken,
                            expiresIn: jwt.verify(jwtToken, process.env.JWT_SECRET).exp
                        });
                    }
                });
            }
            else {
                res.status(401).json({
                    message: 'Authentication failed'
                });
            }
        })
        .catch(function(err) {
            res.status(500).json({
                error: true,
                message: err.message
            })
        });
};

exports.createAccount = function(req, res, next) {
    const data = req.body;
    let username = data.username;
    const password = data.password;
    
    if (!username || !password) {
        return res.status(500).json({
            error: true,
            message: 'Missing required fields'
        });
    }

    if (!verifyUsername(username)) {
        return res.status(500).json({
            error: true,
            message: 'Invalid username'
        });
    }

    if (!verifyPassword(password)) {
        return res.status(500).json({
            error: true,
            message: 'Invalid password'
        });
    }

    username = username.toLowerCase();
    User.findOne({ username: username })
            .exec()
            .then(function(doc) {
                if (doc) {
                    res.status(409).json({
                        error: true,
                        message: 'Username taken'
                    });
                }
                else {
                    bcrypt.hash(password, 10, function(error, hash) {
                        if (error) {
                            res.status(500).json({
                                message: 'Could not generate password hash',
                                error: true 
                            });
                        }
                        else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                username: username,
                                password: hash
                            });
                            user
                                .save()
                                .then(function(result) {
                                    res.status(201).json({
                                        message: 'Account created'
                                    });
                                })
                                .catch(function(err) {
                                    res.status(500).json({
                                        error: true,
                                        message: err.message
                                    })
                                });
                        }
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    error: true,
                    message: err.message
                })
            });
};