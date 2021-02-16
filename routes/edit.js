var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory')
const Cube = require('../models/cube');
const auth = require('../controllers/auth');


// Get Edit Cube 
router.get('/:id', auth, function(req, res, next) {
  let id = req.params.id;
  Cube.findOne({_id: id}).populate('accessories')
    .then((results) => {
      console.log("The single cube to edit is are ", results)
      // console.log("the accessories are ", results.accessories)
      res.render('edit', {title: "Edit Cube", cube: results, accessories: results.accessories})
    });
});


// POST edit cube 

router.post('/:id', auth, async function(req,res,next) {
  let id = req.params.id;
  console.log(req.body)
  let { name, description, image_url, difficultyLevel} = req.body;
  console.log('the name is ', name)
  let cubeToUpdate = await Cube.findOne({_id: id}).populate('accessories');
  console.log("the cube to update is ", cubeToUpdate)
  cubeToUpdate.name = name;
  cubeToUpdate.description = description;
  cubeToUpdate.image_url = image_url;
  cubeToUpdate.level = difficultyLevel;
  await cubeToUpdate.save().then((results) => {
    res.render('details', {title: "Cube Details", cube: results, accessories: results.accessories, loggedIn: req.cookies.loggedIn})
  });

  // res.send(cubeToUpdate)
   // res.render('edit', {title: "Edit Cube", cube: results, accessories: results.accessories})

  
})

module.exports = router;
