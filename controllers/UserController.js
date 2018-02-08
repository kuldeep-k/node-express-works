var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('../models/User');

router.post('/', function (req, res) {
  console.log("IN POST")
console.log(req);
User.create({
    email : req.body.email,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    dob : req.body.dob,
    education : req.body.education,
    occupation : req.body.occupation,
    currentLocation : req.body.currentLocation,
    perLocation : req.body.perLocation
  },
  function (err, user) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(user);
  });

});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
  console.log("IN GET")
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        const list = users.map((row) => {
          return {
            email : row.email,
            firstName : row.firstName,
            lastName : row.lastName,
            dob : row.dob,
            education : row.education,
            occupation : row.occupation,
            currentLocation : row.currentLocation,
            perLocation : row.perLocation
          }
        });
        res.status(200).send(list);
    });

});

// RETURNS USER DETAILS IN THE DATABASE
router.get('/:id', function (req, res) {
  console.log("IN GET")
    User.findOne({"_id":req.params.id}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send({
          email : user.email,
          firstName : user.firstName,
          lastName : user.lastName,
          dob : user.dob,
          education : user.education,
          occupation : user.occupation,
          currentLocation : user.currentLocation,
          perLocation : user.perLocation
        });
    });

});

// UPDATE USER DETAILS IN THE DATABASE
router.put('/:id', function (req, res) {
  console.log("IN GET")
    User.update({"_id":req.params.id}, {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      dob : req.body.dob,
      education : req.body.education,
      occupation : req.body.occupation,
      currentLocation : req.body.currentLocation,
      perLocation : req.body.perLocation
    }, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });

});

// DELETE USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
  console.log("IN GET")
    User.remove({"_id":req.params.id}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });

});

module.exports = router;
