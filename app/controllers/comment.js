var Comment = require('../models/comment');


//
exports.save = function (req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.movie;

    if(_comment.cid) {
        Comment.findById(_comment.cid, function (err, comment) {
            var reply = {
              from: _comment.from,
              to: _comment.tid,
              content: _comment.content
            }

            comment.reply.push(reply);

            comment.save(function (err , comment) {
              if (err) {
                  console.log(err);
              }

              res.redirect('/movie/' + movieId);
            })
        })
    }
    else {
        var comment = new Comment(_comment);

        comment.save(function(err, comment) {
            if (err) {
                console.log(err);
            }

            res.redirect('/movie/' + movieId);
        })
    }



};

//list page
exports.list = function (req, res) {
    Movie.fetch(function(err,movies){
        if (err) {
            console.log(err);
        }

        res.render('cp/list',{
            title:'imovie 列表页',
            movies:movies
        })
    })
};



//list delete movie
exports.del = function (req, res) {
    var id = req.query.id;
    console.log("deleteQuery:",req);
    if (id) {
        Movie.remove({_id:id},function(err,movie){
            if (err) {
                console.log(err);
            }

            else{
                res.json({success:1});
            }
        })
    }
};