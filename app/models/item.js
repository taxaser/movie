var mongoose = require('mongoose');
var ItemSchema = require('../schemas/item');
var Item = mongoose.model('item', ItemSchema);
//console.log(Movie);
module.exports = Item;