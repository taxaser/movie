var Movie = require('../models/movie');
var Category = require('../models/category');

var _ = require('underscore');


//admin page
exports.new = function (req, res) {
    res.render('cp/category_admin',{
        title:'imovie 后台分类录入页',
        category:{}
    })
};

// admin post movie
exports.save = function (req, res) {
    var _category = req.body.category;


        var category = new Category(_category);

        category.save(function(err, movie) {
            if (err) {
                console.log(err);
            }

            res.redirect('/admin/category/list');
        })

};

//userlist page
exports.list = function (req, res) {

    Category.fetch(function(err,categories){
        if (err) {
            console.log(err);
        }
        console.log('categories:',categories)
        res.render('cp/category_list',{
            title:'分类列表页',
            categories:categories
        })
    })
};