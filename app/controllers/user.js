var User = require('../models/user');

//siginup

exports.showSignup = function (req, res) {
    res.render('passport/signup', {
        title: '注册页面'
    })
};

exports.showSignin = function (req, res) {
    res.render('passport/signin', {
        title: '登陆页面'
    })
};

exports.signup = function (req, res) {
        var _user = req.body.user;
        User.findOne({name: _user.name}, function (err, user) {
            if(err) {
                console.log(err);
            }
            if(user) {
                return res.redirect('/passport/signin');
            }else{
                var user = new User(_user);

                user.save(function (err, user) {
                    if(err) {
                        console.log(err);
                    }
                    console.log("user:",user);
                    req.session.user = user;
                    res.redirect('/');
                });
            }
        });
        // req.param('user')
        //console.log(req.query);

        console.log(_user);

};

exports.signin = function (req, res) {

    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name: name}, function (err, user) {
        if(err) {
            console.log(err);
        }

        if(!user) {
            return res.redirect('/passport/signup');
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                console.log(err);
            }
            if(isMatch) {
                req.session.user = user;
                return res.redirect('/');
            }else{
                console.log('Password is not matched!');
                return res.redirect('/passport/signin');
            }
        })

    })
};

//logout
exports.logout = function (req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
};

//userlist page
exports.list = function (req, res) {

    User.fetch(function(err,users){
        if (err) {
            console.log(err);
        }

        res.render('cp/userlist',{
            title:'用户 列表页',
            users:users
        })
    })
};


exports.del = function (req, res) {
    var id = req.query.id;
    console.log("id:",id);
    if (id) {
        User.remove({_id:id},function(err,user){
            if (err) {
                console.log(err);
            }

            else{
                res.json({success:1});
            }
        })
    }
};


exports.signinRequired = function (req, res, next) {
    var user = req.session.user;
    if(!user) {
        return res.redirect('/passport/signin')
    }

    next();
};

exports.adminRequired = function (req, res, next) {
    var user = req.session.user;
    console.log("role:",user.role);
    if(user.role <= 10) {
      return res.redirect('/passport/signin')
    }
    next();
};