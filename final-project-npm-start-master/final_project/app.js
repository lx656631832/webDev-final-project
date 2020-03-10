module.exports = function (app) {
    //initialize models
    let model = require('./model/user');
    //initialize routes
    let router = require('./routes/router');
    router(app);
}
