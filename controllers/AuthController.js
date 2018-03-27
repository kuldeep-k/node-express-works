var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../services/verifyToken');

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');

router.post('/signIn', function (req, res) {
    User.findOne({
        email : req.body.email
    },
    function (err, user) {
        if (err) throw err;
 
        if (!user) {
           res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign({ id: user._id, email: user.email, fullName: user.firstName + ' ' + user.lastName }, 
                'UPLeQWoNzWmp9DW72FRwlzHEqeG6DKCB', {
                expiresIn: 86400 // expires in 24 hours
            });
            // var token = 'testtoken';
            // return the information including token as JSON
            res.json({success: true, token: token});
            } else {
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        });
        }
    });
});

// LOG OUT USER
router.delete('/signOut', verifyToken, function (req, res) {
    res.send({success: true, msg: 'Logout.'});
});

module.exports = router;
