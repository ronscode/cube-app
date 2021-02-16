var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory')
const Cube = require('../models/cube');
const auth = require('../controllers/auth');


/* GET users listing. */
router.get('/:id', auth, function(req, res, next) {
  let id = req.params.id;
  Cube.findOne({_id: id}).populate('accessories')
    .then((results) => {
      console.log("The cube to delete is ", results)
      console.log("the accessories are ", results.accessories)
      res.render('delete', {cube: results, accessories: results.accessories})
    });
});

router.post('/:id', auth, async function(req, res, next) {
  let id = req.params.id;
  console.log("delete cube post ", id)
 await Cube.deleteOne({_id: id}, function(response) {
  // if (err) console.log(err);
   console.log(response)
   res.redirect('/')
 })
})

module.exports = router;
