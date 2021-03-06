var Movie = require('../models/movie');
var Category = require('../models/category');

//index page
exports.index = function(req, res) {
    Category
        .find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec(function (err, categories) {
            if (err) {
                console.log(err);
            }
            console.log("Index categories:",categories);
            res.render('home/index',{
                title:'imovie 首页',
                categories:categories
            })
        });

};

//search page
exports.search = function(req, res) {
    var catId = req.query.cat;
    var page = parseInt(req.query.p, 10) || 0;
    var q = req.query.q;
    var count = 2;
    var index = page * count;
    if (catId) {
        Category
            .find({_id: catId})
            .populate({
                path: 'movies',
                select: 'title poster'
            })
            .exec(function (err, categories) {
                if (err) {
                    console.log(err);
                }
                //console.log("Index categories:",categories);

                var category = categories[0] || {};
                var movies = category.movies || [];

                console.log("movies:", movies);
                var results = movies.slice(index, index + count);

                res.render('home/results', {
                    title: '结果列表页面',
                    keyword: category.name,
                    currentPage: (page + 1),
                    query: 'cat=' + catId,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                })
            });

    }
    else {
        Movie
            .find({title: new RegExp(q+'.*', 'i')})
            .exec(function(err, movies){
                if (err) {
                    console.log(err);
                }

                var results = movies.slice(index, index + count);

                res.render('home/results', {
                    title: '结果列表页面',
                    keyword: q,
                    currentPage: (page + 1),
                    query: 'q=' + q,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                })
            })
    }
};