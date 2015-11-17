var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = mongoose.model('Category', CategorySchema);
//console.log(Comment);
module.exports = Category;