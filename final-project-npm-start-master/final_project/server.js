let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

mongoose.connect('mongodb://localhost/final',{useUnifiedTopology: true, useNewUrlParser: true})

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    // var allowHeaders = "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, Authorization, token,id";
    // res.addHeader("Access-Control-Allow-Headers", allowHeaders);
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With, Authorization, token,id");
    res.header('Access-Control-Allow-Methods', '*');
    // res.header('Access-Control-Allow-Headers:content-type,token,id');
    res.header("Access-Control-Request-Headers: Origin, X-Requested-With, content-Type, Accept, Authorization");
    res.header('Content-Type', 'application/json;charset=utf-8');

    next();
});
//Initialize app
let initApp = require('./app');
initApp(app);
app.use(expressJwt({
    secret: 'my_token'
}).unless({
    path:['/login']
}))


app.listen(3009,function () {
    console.log('app is running...')
})
