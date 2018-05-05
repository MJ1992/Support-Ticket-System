var express = require('express');
var router = express.Router();
var Ticket = require('../models/ticket');
var User = require('../models/user');
var resGenerator = require("../../libs/responseGenerator");
var verifyToken = require('../../middlewares/verifyToken');
var verifyUser = require('../../middlewares/verifyUser');

module.exports.controller = function(app) {

    //get all ticket
    router.get('/', verifyToken, verifyUser, function(req, res) {
        Ticket.find({}, function(err, tickets) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "All tickets", 200, tickets));
            }
        });
    });

    //get particular ticket
    router.get('/:id', verifyToken, function(req, res) {
        Ticket.findById(req.params.id, function(err, ticket) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Requested ticket", 200, ticket));
                console.log(ticket);
            }
        });

    });
    //get all ticket of particular user

    router.get('/user/myTickets', verifyToken, function(req, res) {
        User.findOne({ username: req.user.username }).populate('tickets').exec(function(err, user) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                console.log(user);
                res.send(resGenerator.generate(false, "Requested ticket", 200, user.tickets));
            }
        });

    });


    //create  a ticket

    router.post('/', verifyToken, function(req, res) {
        Ticket.create(req.body, function(err, ticket) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                User.findOne({ username: req.user.username }, function(err, user) {
                    if (err) {
                        res.send(resGenerator.generate(true, "An Error occured", 403, err));
                    } else {
                        ticket.userInfo.id = req.user.userId;
                        // ticket.userInfo.username = req.user.username;
                        // ticket.userInfo.email = req.user.email;
                        // ticket.userInfo.mobile = user.mobile;
                        ticket.save();
                        user.tickets.push(ticket);
                        user.save();
                    }
                });
                res.send(resGenerator.generate(false, "Ticket Created", 200, ticket));
            }
        });
    });

    //edit a ticket
    router.get('/:id/edit', verifyToken, function(req, res) {
        Ticket.findById(req.params.id, function(err, ticket) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Ticket to Update", 200, ticket));
            }
        });
    });

    router.put('/:id', verifyToken, function(req, res) {
        console.log(req.body);
        Ticket.findByIdAndUpdate(req.params.id, req.body, function(err, ticket) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Ticket Updated", 200, ticket));
            }
        });
    });

    //delete a ticket
    router.delete('/:id', verifyToken, function(req, res) {
        Ticket.findByIdAndRemove(req.params.id, function(err, ticket) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Ticket Deleted", 200, ticket));
            }
        });
    });



    app.use('/tickets', router);
};