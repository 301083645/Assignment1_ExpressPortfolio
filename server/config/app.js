/*
File Name: Assignment2
Student's Name: Eunbee Lee
Student ID: 301083645
Date: 2020 Oct 24th
 */

//installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

//authentication objects
let localStrategy = passportLocal.Strategy;
// create a Visitor Model Instance
let visitorModel = require('../models/visitor');
let Visitor = visitorModel.Visitor;

//module for auth messaging and error management
let flash = require('connect-flash');

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let userRouter = require('../routes/user');

let app = express();

//database setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
let mongoDB = mongoose.connection; //alias

mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

mongoDB.once('connected', ()=>{
  console.log('MongoDB Connected');
});

mongoDB.on('disconnected', ()=>{
  console.log('MongoDB Disconnected');
});

mongoDB.on('reconnected', ()=>{
  console.log('MongoDB Reconnected');
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); // add routes automatically
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
let Auth = require('./auth');
app.use(session({
  secret: Auth.Secret,
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport visitor configuration

// impletment a User Authentication Strategy
passport.use(Visitor.createStrategy());

// serialize and deserialize the Visitor Info
passport.serializeUser(Visitor.serializeUser());
passport.deserializeUser(Visitor.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user-list', userRouter);

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
  res.render('error', {title: 'Error'});
  //res.render('error');
});

module.exports = app;
