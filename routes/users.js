var express = require('express');
var router = express.Router();
// Configuring the database
const dbConfig = require('../config/database.config');
const mongoose = require('mongoose');
const Users = require('../Controller/user.controllers');

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

// router.post("/register", async (request, response) => {
//   try {
//       var user = new UserModel(request.body);
//       var result = await user.save();
//       response.send(result);
//   } catch (error) {
//       response.status(500).send(error);
//   }
// });
// router.get("/login", async (request, response) => {
//   try {
//     var result = await UserModel.find().exec();
//     response.send(result);
//   } catch (error) {
//       response.status(500).send(error);
//   }
// });
router.get('/login',  Users.findByUsername);
router.post('/register',Users.create);
module.exports = router;
