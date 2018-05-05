//var socketio = require('socket.io');
var mongoose = require('mongoose');
var Ticket = require('../app/models/ticket');
var User = require('../app/models/user');
var Chat = require('../app/models/chat');
var socketioJwt = require('socketio-jwt');
var config = require('./config');
var emailNotify = require('./sendEmailNotification');


//Event emitter setup
var events = require("events");
var eventsEmitter = new events.EventEmitter();
eventsEmitter.setMaxListeners(0);

module.exports.sockets = function(http) {

    var io = require('socket.io')(http);



    io.on('connection', function(socket) {
        console.log('Connection started');

        //===================//
        socket.on('joinroom', function(data) {
            socket.rooms = '';
            socket.room = data;
            socket.join(data);
            console.log(socket.room);
            //event to fetch old msg history
            eventsEmitter.emit('old-msg', socket.room);
        });

        socket.on('message', function(data) {
            console.log(data);
            //    console.log(socket);
            console.log(socket.room);
            console.log(socket.rooms, 1);
            io.sockets.in(socket.room).emit('msg sent', data);
            eventsEmitter.emit('msg-data', data);
        });
        //when click on accept as answer
        socket.on('answered', function(data) {
            eventsEmitter.emit('update-msg', data);
            eventsEmitter.emit('closed', data.room);

        });
        //close ticket button
        socket.on('closedTicket', function(data) {
            console.log(data, 'closedTicket');
            eventsEmitter.emit('closed', data);
        });



        //=====//
        eventsEmitter.on('update-msg', function(data) {
            Chat.findByIdAndUpdate(data._id, data, function(err, chat) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('msg updated');
                    eventsEmitter.emit('old-msg', socket.room);
                }
            });
        });
        //=================//
        socket.on('reopened', function(data) {
            eventsEmitter.emit('updateAll', data);
            eventsEmitter.emit('reopened', data);
        });
        //updating all
        eventsEmitter.on('updateAll', function(data) {
            Chat.find({ room: data }, function(err, chats) {
                if (err) {
                    console.log(err);
                } else {
                    chats.forEach(function(chat) {
                        chat.isAnswer = false;
                        chat.save();
                    });
                    var history = { room: data, chats: chats };
                    eventsEmitter.emit('chat-history', history);
                    //console.log(chats);
                }
            });
        });





        //====================//

        //chat history sent
        eventsEmitter.on('chat-history', function(data) {
            io.in(data.room).emit('chat-history', data);
        });

        //on disconnect



    });
    //to save the chat in database
    eventsEmitter.on('msg-data', function(data) {
        Chat.create(data, function(err, chat) {
            if (err) {
                console.log(err);
            } else {
                console.log('chat saved');

            }
        });


    });

    //Retrieving old messages from database
    eventsEmitter.on('old-msg', function(data) {
        Chat.find({ room: data }, function(err, chats) {
            if (err) {
                console.log(err);
            } else {
                var history = { room: data, chats: chats };
                eventsEmitter.emit('chat-history', history);
                //console.log(chats);
            }
        });
    });


    //Sending mails 
    eventsEmitter.on('msg-data', function(data) {
        console.log("email send karo");

        Chat.find({ room: data.room }, function(err, chats) {
            if (err) {
                console.log(err);
            } else {
                var users = [];
                chats.forEach(function(chat) {
                    users.push(chat.from);
                });
                var allEmailUsers = users.filter(function(user) {
                    return (user != data.from);
                });
                var emailUsers = allEmailUsers.filter(function(item, pos) {
                    return allEmailUsers.indexOf(item) == pos;
                });
                console.log(emailUsers);
                if (emailUsers.length == 0) {
                    emailNotify.sendEmail(config.admin, "Hi User, \nThis message is to inform you that a reply has been recieved on ticket: #" + data.room + ". \nPlease contact the Client Support team at #### if you have any further questions or issues.\n Thank you for using our product.\n");
                } else {

                    emailUsers.forEach(function(emailUser) {

                        User.findOne({ username: emailUser }, function(err, user) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(user.email);
                                emailNotify.sendEmail(user.email, "Hi User, \nThis message is to inform you that a reply has been recieved on ticket: #" + data.room + ". \nPlease contact the Client Support team at #### if you have any further questions or issues.\n Thank you for using our product.\n");
                            }
                        });


                    });

                }

            }
        });


    });
    //when ticket closed
    eventsEmitter.on('closed', function(data) {
        console.log("email" + data);
        Ticket.findById(data, function(err, ticket) {
            if (err) {
                console.log(err);
            } else {
                console.log('closed working');
                emailNotify.sendEmail(ticket.userInfo.email, "Hi User, \n  This message is to inform you that status of your issue #" + ticket._id + " has been moved to Closed. \n Please contact the Client Support team at #### if you have any further questions or issues.\n Thank you for using our product");
            }
        });

    });
    eventsEmitter.on('closedTicket', function(data) {
        console.log("email" + data);
        Ticket.findById(data, function(err, ticket) {
            if (err) {
                console.log(err);
            } else {
                console.log('closed working');
                emailNotify.sendEmail(ticket.userInfo.email, "Hi User, \n  This message is to inform you that status of your issue #" + ticket._id + "  has been moved to Closed. \n Please contact the Client Support team at #### if you have any further questions or issues.\n Thank you for using our product");
            }
        });

    });


    //when ticket reopened
    eventsEmitter.on("reopened", function(data) {

        Ticket.findById(data, function(err, ticket) {
            if (err) {
                console.log(err);
            } else {

                emailNotify.sendEmail(ticket.userInfo.email, "Hi User, \n  This message is to confirm that status of your issue #" + ticket._id + "  has been moved to Reopened. \n Please contact the Client Support team at #### if you have any further questions or issues.\n Thank you for using our product");
            }
        });

    });

    return io;
};