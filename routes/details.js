var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory')
const Cube = require('../models/cube');
const auth = require('../controllers/auth');


/* GET users listing. */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  Cube.findOne({_id: id}).populate('accessories')
    .then((results) => {
      console.log("The single cube results are ", results)
      console.log("the accessories are ", results.accessories)
      res.render('details', {cube: results, accessories: results.accessories, loggedIn: req.cookies.loggedIn})
    });
});

module.exports = router;
