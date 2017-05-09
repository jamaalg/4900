var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product =require('../models/product');

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

router.get('/add-to-cart/:id', function(req,res,next){
  var productId = req.params.id;
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
    return res.render('shop/shopping-cart', {products: bull});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products:cart.generateArray(), totalPrice: cart.totalPrice});

});


module.exports = router;
