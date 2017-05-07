var express = require('express');
var router = express.Router();

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

module.exports = router;
