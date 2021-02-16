var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.body)
  Cube.find()
    .then((response) => {
      console.log('all the cubes are ', response)
      res.render('search', { title: 'Search Cube Results', cube: response });
    })
  
});


module.exports = router;
