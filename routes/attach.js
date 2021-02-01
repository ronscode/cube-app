var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

//console.log('theAccessory is ', theAccessory  )

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var theAccessory;

  Accessory.find({}).then((response) => {
  console.log(response)
    theAccessory = response
  });
  Cube.findOne({_id: req.params.id}).populate('accessories')  
  .then((response) => {
      console.log('***** Cube to attach accessory to ', response.accessories[1], theAccessory)
      res.render('attachAccessory', { title: 'Attach Accessory', cube: response, accessories: theAccessory });
    })
  
});

router.post('/:id', function(req, res, next) {
  console.log('The attach form is ', req.body);

  var theAccessory;
Accessory.find({}).then((response) => {
console.log(response)
  theAccessory = response
});
  Cube.findOneAndUpdate({_id: req.params.id}, { $addToSet: { accessories: [req.body.accessory]}}, function(err, res) {
    if (err) {
      res.send(err);
    } else {
      console.log(res)
    }
  } )
});


module.exports = router;
