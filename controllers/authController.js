const User = require('../models/user');

module.exports.signup_get = (req, res, next) => {
  res.render('register', { title: 'Register for le`Cube' });
}

module.exports.login_get = (req, res, next) => {
  res.render('login', { title: 'Register for le`Cube' });
}

module.exports.signup_post = async (req, res, next) => {
  const { username, password } = req.body;

  try {
   const user = await User.create({ username, password })
   res.status(201).json(user);
   return;
  } catch (err) {
    console.log(err)
    res.status(400).send('user denied');
    return;
  }
  
  res.send('New signup post req' +  username +  password)
}

module.exports.login_post = (req, res, next) => {
 
  const { username, password } = req.body;
  console.log(username, password)
  res.send('New login post req'  )
}