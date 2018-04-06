var User = require('../models/User');

class UserService {
  constructor() {

  }

  getUsers(query, cb) {
    const sortClause = {};
    const sortOrder = query.sortOrder;
    sortClause[query.sortBy ] = query.sortOrder;

    return User.find(query.filter)
      .sort(sortClause)
      //.sort({'email': 1 })
      .skip(query.offset)
      .limit(query.limit)
      .exec(function(err, users) {
        if (err) {
          cb(err, null)
        } else {
          User.count(query.filter, function(err, cnt) {
            if (err) {
              cb(err, null)
            } else {
              const list = users.map((row) => {
                return {
                  id : row._id,
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
              cb(null, { data: list, total: cnt})
            }
          });

        }
        // res.status(500).send("There was a problem finding the users.");

        //return { data: list, total: 10};
        setTimeout( () => {
          //res.status(200).send({ data: list, total: 10} );

        },2000);
      });
  }
}

module.exports = UserService;
