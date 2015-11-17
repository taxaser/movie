var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie', MovieSchema);
//console.log(Movie);
module.exports = Movie;