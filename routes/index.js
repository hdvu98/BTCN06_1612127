var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/me', passport.authenticate('jwt', { session: false }),
    function(req, res) {
      if(!req.user){
        res.send('login to show account info');
      }
      res.send(req.user);
    }
);
module.exports = router;
