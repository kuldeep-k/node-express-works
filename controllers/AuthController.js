var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
var verifyToken = require('../services/verifyToken');
var passport = require('passport');
const config = require('../config/config');
// var passport = require('../services/passport');
require('../services/passport');
// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../models/User');

router.post('/signIn', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err && !user) {
        res.status(401).send({success: false, msg: 'Login Failed'});  
      } else {
        req.login(user, {session: false}, function(err) {
            if(err) {
                res.status(401).send({success: false, msg: err});  
            } else {
              var token = jwt.sign({ id: user.id, email: user.email, fullName: user.firstName + ' ' + user.lastName }, 
                config.jwt.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              return res.json({success: true, token: token}); 
            }
        });
      }
      
      
    /*User.findOne({
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
        }*/
    })(req,res,next);
});

// LOG OUT USER
router.delete('/signOut', verifyToken, function (req, res) {
    res.send({success: true, msg: 'Logout.'});
});

module.exports = router;
