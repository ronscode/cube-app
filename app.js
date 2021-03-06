var createError = require('http-errors');
var express = require('express'); // Require library of code that is Express
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
const jwt = require('jsonwebtoken');

// Routers that have all the get/post etc routes

var indexRouter = require('./routes/index');
var createCubeRouter = require('./routes/create');
var attachAccessoryRouter = require('./routes/attach');
var detailsRouter = require('./routes/details');
var aboutRouter = require('./routes/about')
var searchRouter = require('./routes/search');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var editRouter = require('./routes/edit');
var deleteRouter = require('./routes/delete')

// Create a variable named "app" to represent our application and invoke Express()
var app = express(); 

// Hide your Mongo connection variables 
require('dotenv').config();

app.set('Secret', process.env.JWT_SECRET)

// Mongo DB Connection 
  mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));

// View Engine Setup

app.set('views', path.join(__dirname, 'views')); // setting folder for public files

// register the partials, hint if it says module not found after you do this, its because the module most likely isn't there! Import it! 

hbs.registerPartials(__dirname + '/views/partials'); 

// setting view engine to hbs, engine compiles views and data into HTML

app.set('view engine', 'hbs'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes

app.use('/', indexRouter); // Router for home page 
app.use('/create', createCubeRouter);
app.use('/attach', attachAccessoryRouter)
app.use('/details', detailsRouter);
app.use('/about', aboutRouter);
app.use('/search', searchRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/edit', editRouter);
app.use('/delete', deleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
