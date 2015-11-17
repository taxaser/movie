var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');


var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoStore = require('connect-mongo')(session);
//var Item = require('./models/item');
var port = process.env.PORT || 3000;

var app = express();
var dbUrl = 'mongodb://127.0.0.1:12345/test';
mongoose.connect(dbUrl);

app.locals.moment = require('moment');
app.set('views','./app/views/');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:'imooc',
    store: new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })

}));


if('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

require('./config/routes')(app);

app.use(express.static(path.join(__dirname,'public')));
app.listen(port);


/*var test = new Item({
    age:14,
    name:"sadan"
});
test.save(function (err, user) {
    if (err) {
        console.log(err);
    }
});*/

