// import the product.js schema
var Product = require('../models/product');

// import the use of mongoose
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('localhost:27017/shopping');
mongoose.Promise =require('bluebird');

// created array of products to put into the databse
var products = [

  // new products with information to put into the database
  new Product({
  imagePath:'http://www.androidcentral.com/sites/androidcentral.com/files/styles/xlarge_wm_brw/public/article_images/2017/03/galaxy-s8-s8-plus-together-7.jpg?itok=XyjOZYf3', title: 'Samsung S8', description: 'Super Phone', price: 10
  }),

  new Product({
  imagePath:'http://www.google.com', title: 'Samsung S7', description: 'Exploding Phone', price: 5
  })

];

var done = 0;
// Loop through products array and insert/save into db
for (var i = 0; i<products.length; i++){
  products[i].save(function(err, result){
    done++;
    if (done === products.length){
      exit();
    }
  });
}

// disconnect from the db
function exit(){
  mongoose.disconnect();
}
