var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const passport    = require('passport');
require('./services/passport');
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,authorization,X-Requested-With,content-type,accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ( req.method === 'OPTIONS' ) {
      console.log('OPTIONS SUCCESS');
      res.status(200).send();
    } else {
      next();
    }
    // Pass to next layer of middleware
    
});

// var UserController = require('./controllers/UserController');
// var AuthController = require('./controllers/AuthController');

app.use('/users', passport.authenticate('jwt', {session: false}), require('./controllers/UserController'));
app.use('/auth', require('./controllers/AuthController'));

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = app;
