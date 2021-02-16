var express = require('express');
var router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('login', { title: "Login to the Cube", loggedIn: req.cookies.loggedIn})
});

router.get('/logout', function(req, res, next) {
  console.log(res.cookie)
  // res.cookie.set('token', {expires: Date.now()});
  // res.cookie.set('loggedIn', {expires: Date.now()});
  res.render('logout')

})

router.post('/logout', function(req, res, next) {
  console.log(res.cookie)
  res.cookie('token', {expires: new Date()});
  res.cookie('loggedIn', false);
  res.render('logout')

})

router.post('/',  async(req, res) => {

  //Login a registered user
  try {
    console.log(req.body)
      const { username, password } = req.body
      const user = await User.findByCredentials(username, password)
      const token = await user.generateAuthToken()
     
  // set token as a cookie 
      res.cookie('token', token, {httpOnly: true, maxAge: 10000 * 10000 });
      res.cookie('loggedIn', true );

      
      //res.send({ user, token });
      res.redirect('/')

  } catch (error) {
    console.log("It didn't work! ")
    return res.status(401).send({error: 'Login failed! Check authentication credentials'})
  }

})

module.exports = router;