var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

//console.log('theAccessory is ', theAccessory  )

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var allAccessory;

  Accessory.find({}).then((response) => {
  //console.log(response)
    allAccessory = response
  });
  Cube.findOne({_id: req.params.id}).populate('accessories')  
  .then((response) => {
      let availAccessories = allAccessory.map(x => x);
      console.log("copied now availAccessories", availAccessories)
      let filteredAcc = []
      for (x of response.accessories) {
        console.log("x is ", x._id);
      }
      console.log('***** Filtered accessories ', filteredAcc)
    //  console.log('***** Cube to attach accessory to ', response)
      res.render('attachAccessory', { title: 'Attach Accessory', cube: response, accessories: allAccessory });
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
