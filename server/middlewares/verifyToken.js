var jwt = require('jsonwebtoken');
var config = require('../libs/config');
var resGenerator = require("../libs/responseGenerator");

function verifyToken(req, res, next) {
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var token = bearerHeader.split(' ')[1];

        if (!token) {
            res.send(resGenerator.generate(true, "No token Provided", 403, { auth: false, token: null }));
        } else {
            jwt.verify(token, config.secretKey, function(err, decoded) {
                if (err) {

                    res.send(resGenerator.generate(true, "Failed to authenticate token.", 500, { auth: false, token: null }));
                } else {
                    req.user = decoded;
                    next();
                }
            });
        }
    } else {

        res.send(resGenerator.generate(true, "Unauthorized access.You need to Login first!", 403, { auth: false, token: null }));
    }
}
module.exports = verifyToken;