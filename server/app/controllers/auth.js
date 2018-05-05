var express = require('express');
var router = express.Router();
var config = require('../../libs/config');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var saltRounds = 10;
var jwt = require('jsonwebtoken');
var resGenerator = require("../../libs/responseGenerator");


module.exports.controller = function(app) {
    router.get('/register', function(req, res) {
        res.send(resGenerator.generate(false, "welcome to SupDesk", 200, {}));
    });

    router.post('/register', function(req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var mobile = req.body.mobile;
        var isAdmin = req.body.isAdmin;
        var password = req.body.password;

        bcrypt.hash(password, saltRounds, function(err, hash) {
            User.create({ username: username, email: email, mobile: mobile, isAdmin: isAdmin, password: hash })
                .then(user => {
                    var token = jwt.sign({
                            username: user.username,
                            email: user.email,
                            userId: user._id,
                            isAdmin: user.isAdmin
                        },
                        config.secretKey, {
                            expiresIn: 86400 // expires in 24 hours
                        });

                    res.send(resGenerator.generate(false, "Welcome to SupDesk!", 200, { auth: true, isAdmin: user.isAdmin, token: token }));
                    console.log(user);
                })
                .catch(err => {
                    var regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i,
                        match = err.message.match(regex),
                        indexName = match[1] || match[2];
                    if (indexName === 'mobile') {
                        indexName += ' no.';
                    }
                    res.send(resGenerator.generate(true, indexName + " already in use.", 403, err));
                });

        });

    });

    router.get('/login', function(req, res) {
        res.send('Hello world');
    });

    router.post('/login', function(req, res) {

        User.findOne({ username: req.body.username })
            .exec()
            .then(user => {
                console.log(req.hostname, 1, req.headers);
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (err) {
                        res.send(resGenerator.generate(true, "An Error occured", 403, err));
                    } else {
                        if (!result) {

                            res.send(resGenerator.generate(true, "Username or Password is incorrect", 403, {}));
                        } else {
                            var token = jwt.sign({
                                    username: user.username,
                                    email: user.email,
                                    userId: user._id,
                                    isAdmin: user.isAdmin

                                },
                                config.secretKey, {
                                    expiresIn: '24h'
                                });
                            res.send(resGenerator.generate(false, "Welcome to SupDesk", 200, { auth: true, isAdmin: user.isAdmin, token: token }));
                        }
                    }
                });


            }).catch(err => {

                res.send(resGenerator.generate(true, "User is not registered", 403, err));
            });
    });
    router.get('/logout', function(req, res) {
        res.send(resGenerator.generate(false, "Logged out Successfully", 200, { auth: false, token: null }));
    });

    //Forgot password functionality

    router.post('/forgot', function(req, res, next) {
        async.waterfall([
                //generate a random token
                function(done) {
                    crypto.randomBytes(20, function(err, buf) {
                        var token = buf.toString('hex');
                        done(err, token);
                    });
                },

                function(token, done) {
                    //finding the associated user in database with  email
                    User.findOne({ email: req.body.email }, function(err, user) {
                        if (!user) {
                            //('error', 'No account found with that email address');
                            return res.send(resGenerator.generate(true, "No account found with that email address", 404, {}));
                        }
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000;

                        user.save(function(err) {
                            done(err, token, user);
                        });

                    });
                },

                function(token, user, done) {

                    //mail thingy here
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: config.email, //  user
                            pass: config.pass //  password
                        }
                    });

                    // setup email data with unicode symbols
                    var mailOptions = {
                        to: user.email,
                        from: config.email,
                        subject: 'SupDesk Password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to reset your password:\n\n' +
                            '' + req.headers.referer + '#!/reset/' + token + '\n\n' +
                            'If you did not request this, please feel free to ignore this email and your password will remain unchanged.\n\n' +
                            'Thanks, \n' + 'The SupDesk Team'
                    };
                    transporter.sendMail(mailOptions, function(err) {
                        console.log('mail sent', mailOptions);
                        //('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                        done(err, 'done');
                    });
                }
            ],
            function(err) {
                if (err) {
                    return next(err);
                }
                return res.send(resGenerator.generate(false, " An e-mail has been sent to  provided mail id with further instructions", 200, {}));
            });

    });

    //Reset password page

    router.get('/reset/:token', function(req, res) {
        //find user with reset token in db
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                //('error', 'Passord token is invalid or has expired');
                return res.send(resGenerator.generate(true, "Password token is invalid or has expired", 403, {}));

            }
            return res.send(resGenerator.generate(false, "", 200, { token: req.params.token }));

        });
    });

    router.post('/reset/:token', function(req, res) {
        async.waterfall([
            function(done) {
                User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                    if (!user) {
                        //('error', 'Passord token is invalid or has expired');
                        return res.send(resGenerator.generate(true, "Passord token is invalid or has expired", 403, {}));
                    }
                    if (req.body.password === req.body.confirm) {
                        var newPassword = req.body.password;
                        bcrypt.hash(newPassword, saltRounds, function(err, hash) {
                            user.password = hash;
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;

                            user.save(function(err) {
                                //        req.logIn(user, function(err) {
                                done(err, user);
                                //      });
                            });
                        });
                    } else {
                        //('error', 'Password do not match');
                        return res.send(resGenerator.generate(true, "Passwords do not match", 403, {}));
                    }
                });
            },

            function(user, done) {

                //mail thingy here
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: config.email, //  user
                        pass: config.pass //  password
                    }
                });

                // setup email data with unicode symbols
                var mailOptions = {
                    to: user.email,
                    from: config.email,
                    subject: 'Password Reset Confirmation',
                    text: 'Hello, \n\n' +
                        'This is a confirmation that password for your account ' + user.email + ' has been changed successfully.'
                };
                transporter.sendMail(mailOptions, function(err) {
                    console.log('mail sent');
                    //('success', 'Success, your password has been changed!!');
                    done(err);
                });
            }


        ], function(err) {
            if (err) {
                return next(err);
            } else {
                return res.send(resGenerator.generate(false, "Password successfully Changed!", 200, {}));
            }
        });
    });






    app.use('/', router);
};