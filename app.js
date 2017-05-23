// Import packages/dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expresshbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator =require('express-validator');
var MongoStore = require('connect-mongo')(session);
var app = express();
var routes = require('./routes/index');
var userRoutes = require('./routes/user');

// Mongoose connect to database
mongoose.connect('localhost:27017/shopping');
// Import passport configuration file
require('./config/passport');

// Handlebars view engine setup
app.engine('.hbs', expresshbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs');

// Middleware Initialization
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());

app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000}
}));

// needs sessions to be initialized first because it uses sessions
app.use(flash());

// Initalize passport, set it to use sessions to store the users
app.use(passport.initialize());
app.use(passport.session());

// Make public files available for use
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/user',userRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
