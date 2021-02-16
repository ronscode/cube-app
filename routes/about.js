var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'About', loggedIn: req.cookies.loggedIn });
});

module.exports = router;
