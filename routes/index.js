var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product =require('../models/product');

router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  // Retrieves all of the prouducts from the database: shopping
  Product.find(function(err,docs){
    // Array to hold all products
    var productChunks = [];
    // Sepcify max size of products to put in a row
    var chunkSize =3;
    // Return products that are in databse and display no more than chunkSize
    for (var i =0; i<docs.length; i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize));
    }
    // Renders the home page view, passes Title Page, Product Array,
    res.render('shop/index', { title: 'Store Content' , products: productChunks, successMsg: successMsg, noMessages: !successMsg });
  });
});

router.get('/add-to-cart/:id', function(req,res,next){
  // stoee the products Id
  var productId = req.params.id;
  // Create a new cart if a previous cart from the user session is available and place items into the cart
  var cart = new Cart(req.session.cart ? req.session.cart: {items: {}});
  Product.findById(productId,function(err,product){
    if (err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

router.get("/shopping-cart", function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products:cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req,res,next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout',{total: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
});

// Checkout Route
router.post('/checkout', function(req,res,next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }

  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")(
    "sk_test_DEDm7Su9rs79ijAZS49V95Po"
  );

  stripe.charges.create({
    amount: cart.totalPrice*100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "test charge"
  }, function(err, charge) {
    // asynchronously called
    if (err){
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    req.flash('success', 'purchase successful');
    req.cart = null;
    res.redirect('/');
  });
});

module.exports = router;
