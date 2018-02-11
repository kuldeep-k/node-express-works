var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('../models/User');

router.post('/', function (req, res) {
  console.log("IN POST")
  const userObj = new User();
  userObj.email = req.body.email;
  userObj.firstName = req.body.firstName;
  userObj.lastName = req.body.lastName;
  userObj.dob = req.body.dob;
  userObj.password = req.body.password;
  userObj.education = req.body.education;
  userObj.occupation = req.body.occupation;
  userObj.currentLocation = req.body.currentLocation;
  userObj.perLocation = req.body.perLocation;
  userObj.save(function(err, results) {
    if(err) {
      return res.status(500).send("Some error occured.");
    }
    return res.status(201).send("User info added.");
  });
  /*User.create({
    email : req.body.email,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    dob : req.body.dob,
    password : req.body.password,
    education : req.body.education,
    occupation : req.body.occupation,
    currentLocation : req.body.currentLocation,
    perLocation : req.body.perLocation
  },
  function (err, user) {
    console.log(err);
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(user);
  });
  */

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
  console.log("IN PUT")

  User.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function(err, userObj){
    if(err ) {
      return res.status(422).send("No valid user found.");
    }

    userObj.email = req.body.email;
    userObj.firstName = req.body.firstName;
    userObj.lastName = req.body.lastName;
    userObj.dob = req.body.dob;
    userObj.password = req.body.password;
    userObj.education = req.body.education;
    userObj.occupation = req.body.occupation;
    userObj.currentLocation = req.body.currentLocation;
    userObj.perLocation = req.body.perLocation;
    userObj.save(function(err, results) {
      if(err) {
        return res.status(500).send("Some error occured.");
      }
      return res.status(201).send("User info updated.");
    });

  });

    /*User.update({"_id":req.params.id}, {
      email : req.body.email,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      dob : req.body.dob,
      password : req.body.password,
      education : req.body.education,
      occupation : req.body.occupation,
      currentLocation : req.body.currentLocation,
      perLocation : req.body.perLocation
    }, function (err, users) {
      console.log(err);
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });*/

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
