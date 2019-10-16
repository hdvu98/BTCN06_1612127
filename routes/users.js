var express = require('express');
var router = express.Router();
// Configuring the database
const dbConfig = require('../config/database.config');
const mongoose = require('mongoose');
const Users = require('../Controller/user.controllers');
const jwt = require('jsonwebtoken');
const passport = require('passport');

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',Users.register);

/* POST login. */
router.post('/login', function (req, res, next) {

  passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Login failed',
              user   : user
          });
      }

      req.logIn(user, {session: false}, (err) => {
          if (err) {
              res.send(s);
          }
          const token = jwt.sign({username: user.username}, 'your_jwt_secret');
          return res.json({success: true,
            message: 'Authentication successful!',
            token:token});
      });
  })
  (req, res);

}
);

module.exports = router;
