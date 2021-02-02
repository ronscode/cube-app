var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/set', function(req, res, next) {
   //res.setHeader('Set-Cookie', 'newUser=true');
   res.cookie("message", "No stock talk")
  // res.end('Cookie set')
  
  res.send('You got the cookies')
  
});



module.exports = router;
