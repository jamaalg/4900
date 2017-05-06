var express = require('express');
var router = express.Router();
var Product =require('../models/product');
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
router.use(csrfProtection);

// Home Page
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){
    // Array to hold all products in the database
    var productChunks = [];
    // Sepcify max size of products to put in a row
    var chunkSize =3;
    // Return products that are in databse and display no more than 3 in a row
    for (var i =0; i<docs.length; i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize));
    }
    res.render('shop/index', { title: 'Store Content' , products: productChunks});
  });
});

// Sign Up Page
router.get('/user/signup', function(req,res,next){
  // Message to display if duplicate email is found using flash messaging
  var messages = req.flash('error');
  res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length >0});
});

// Used to log user in, authentication using passport
router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

// User Profile Page
router.get('/user/profile', function(req,res,next){
    res.render('user/profile');
});

router.get('/user/signin', function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length >0});
});

router.post('/user/signin', passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;
