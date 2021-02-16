var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET home page. */
router.get('/', function(req, res, next) {
  Cube.find()
    .then((response) => {
      console.log('all the cubes are ', response);
      //console.log("The login cookie is ", req.cookies.loggedIn)
      res.render('index', { title: 'Express Now With Mongo', cube: response, loggedIn: req.cookies.loggedIn });
    })
  
});


module.exports = router;
