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
  imagePath:'http://s7d2.scene7.com/is/image/SamsungUS/600_006_Galaxy_S7_bk_Left_Angle', title: 'Samsung S7', description: 'Exploding Phone', price: 5
}),

new Product({
imagePath:'https://howtobeswell.files.wordpress.com/2013/01/baume-et-mercier-capeland-10006-mood_1.jpg', title: 'Baumer Mercier', description: 'watch', price: 7500
}),

  new Product({
  imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEZo8_U2Xo9F55yqhQqmnBtTys0Pv_x7gCVAs2tX4LJ7Jk5osL', title: 'LG V20', description: 'LG has an all new phone out this year which has a 32 bit DAC dedciated to audiphiles who love to listen to there music on the go.', price: 800
}),

  new Product({
  imagePath:'http://i-cdn.phonearena.com/images/phones/63258-xlarge/Apple-iPhone-7-0.jpg', title: 'iPhone 7', description: '', price: 750
}),

  new Product({
  imagePath:'http://i-cdn.phonearena.com/images/phones/66159-xlarge/LG-G6-0.jpg', title: 'LG G6', description: 'After the colossal failure that was the LG G5, they look to rebound from a lackluster product launch with the all new G6. It is packed with 4GB of ram and a snapdragon 900.', price: 650
}),

  new Product({
  imagePath:'http://cdn.cultofmac.com/wp-content/uploads/2016/04/iPad-Pro-7-780x521.jpg', title: 'iPad Pro', description: 'The 2017 iPad Pro is packed with an awful lot of nothing', price: 1200
}),

  new Product({
  imagePath:'http://www.baume-et-mercier.com/content/bem/website-com/unitedstates/en/b-m-world/news/news/2015/cobra-capeland-limited-edition/_jcr_content/newsgallery/image_1f5f/image.955475406.nocrop.jpeg', title: 'Baumer Mercier Capeland', description: 'This all new special edition watch was released in 2016 and is apart of a special collection paying homage to the racing culture. ', price: 2500
}),

new Product({
imagePath:'http://d3ae0koducpnek.cloudfront.net/uploads/asset_image/image/5786bea7104ec807af000b62/products_primary_red-raven-brain-1-og.png?v=1468448765', title: 'Red Raven 4K Brain', description: '*** Note *** this is for the BRAIN ONLY, you will need to purchase additional add ons in order for the camera to function properly.', price: 9500
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
