//import service
const service = require('../services/services');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Poster = mongoose.model('Poster');
//return a list of objects based on the search parmaters
exports.login = function(request,response){
    console.log(request.body.username);
    const data = request.body;
    if(!data.username || !data.password){
        // return response.body = {
        //     code:'000002',
        //     data:null,
        //     msg:'invalid parameter'
        // }
        response.json({
            status: 'invalid parameter',
            data: null
        })
        return;
    }
    // const result = User.findOne({
    //     username:data.username,
    //     password:data.password
    // })
    User.findOne({ username: data.username}, function(err, user) {
        console.log('User found ');
        // In case the user not found
        if(err) {
            console.log('THIS IS ERROR RESPONSE')
            response.json(err)
        }
        if (user && user.password === data.password){
            console.log('User and password is correct')
            const token = jwt.sign({
                    username: user.username,
                    _id:user._id
                },'my_token',{expiresIn:'1h'}
            );
            response.json({
                // status: 'ok',
                // data: { token: token }
                token: token,
                _id: user._id
            })
        } else {
            console.log("Credentials wrong");
            response.json({data: "Login invalid"});
        }
    });
    // console.log(result);
    // if(result!==null){
    //     const token = jwt.sign({
    //         username: result.username,
    //         _id:result._id
    //     },'my_token',{expiresIn:'1h'}
    //     );
    //     // return response.body = {
    //     //     code:'000001',
    //     //     data:token,
    //     //     msg:'successfully login'
    //     // }
    //     response.json({
    //         status: 'ok',
    //         data: { token: token }
    //     })
    // }else{
    //     // return response.body = {
    //     //     code:'000002',
    //     //     data:null,
    //     //     msg:'wrong username or password'
    //     // }
    //     response.json({
    //         status: 'wrong username or password',
    //         data: null
    //     })
    // }
};

//users operation
//userd
exports.listUser = function (request,response) {
    const resolve = function (users) {
        response.status(200);
        response.json(users);
    };
    service.searchUser({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};
//return a object in json
//used
exports.getUser = function(request,response){
    const resolve = function (user) {
        response.status(200);
        response.json(user);
    };
    service.getUser(request.params.userId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
//used
exports.postUser = function(request,response){
    const newUser = Object.assign({},request.body);
        const data = request.body;
        const resolve = function (user) {
            response.status(200);
            response.json(user);
        };
    // let body = request.body
    // User.findOne({ username: body.username}), function(err, data) {
    //     console.log('User found ');
    //     // In case the user not found
    //     if(err) {
    //         console.log('THIS IS ERROR RESPONSE');
    //         return response.status(500).json(err)
    //     }
    //     if(data){
    //         console.log("User exsits");
    //         return response.render( "The username has exsited");
    //     }
    //     new User(body).save(function (err,user) {
    //         if(err){
    //             return response.status(500).json(err)
    //         }
    //         response.status(200).json({
    //             message:'ok'
    //         })
    //         response.redirect('/user')
    //     })
    //
    // }
    service.saveUser(newUser)
        .then(resolve)
        .catch(renderErrorResponse(response));

};
//used
exports.putUser = function(request,response){
    const user = Object.assign({},request.body);
    const resolve = function (user) {
        response.status(200);
        response.json(user);
    };
    user._id = request.params.userId;
    service.updateUser(request.params.userId,request.body)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
//used
exports.deleteUser=function(request,response){
    const resolve =function (user) {
        response.status(200);
        response.json({
            message:'user successfully deleted'
        });
    };
    service.deleteUser(request.params.userId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};


//PET  operation
//used
exports.listPet = function (request,response) {
    const user = Object.assign({},request.body);
    const resolve = function (pet) {
        response.status(200);
        response.json(pet);
    };
    user._id = request.params.userId;
    service.searchPet(user)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

exports.postPet = function(request,response){
    const newPet = Object.assign({},request.body);
    const resolve = function (pet) {
        response.status(200);
        response.json(pet);
    };
    service.savePet(newPet)
        .then(resolve)
        .catch(renderErrorResponse(response));
};


exports.getPet = function(request,response){
    const resolve = function (pet) {
        response.status(200);
        response.json(pet);
    };
    service.getPet(request.params.petId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
exports.putPet = function(request,response){
    const pet = Object.assign({},request.body);
    const resolve = function (pet) {
        response.status(200);
        response.json(pet);
    };
    pet._id = request.params.petId;
    service.updatePet(request.params.petId,request.body)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
exports.deletePet=function(request,response){
    const resolve =function (pet) {
        response.status(200);
        response.json({
            message:'pet successfully deleted'
        });
    };
    service.deletePet(request.params.petId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

//poster opreation


exports.listPoster = function (request, response) {
    const resolve = (poster) => {
        response.status(200);
        response.json(poster);
    };
    service.searchPoster({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

exports.getPoster = function(request,response){
    const resolve = function (poster) {
        response.status(200);
        response.json(poster);
    };
    service.getPoster(request.params.postId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

exports.postPoster = function (request, response) {
    // const newPoster = Object.assign({}, request.body);
    // const resolve = (poster) => {
    //     console.log("print the poster ..."+poster);
    //     User.findOne({_id:poster.user},function (err,user) {
    //         if(err){
    //             console.log('THIS IS ERROR RESPONSE')
    //             response.json(err)
    //         }else {
    //             console.log("print user object  "+user)
    //             const poster2 = newPoster
    //             poster2.name = user.username;
    //             service.updatePoster(poster2);
    //         }
    //     })
    //
    //     response.status(200);
    //     response.json(poster);
    //
    //
    // };
    // service.savePoster(newPoster)
    //     .then(resolve)
    //     .catch(renderErrorResponse(response));
    console.log(request.body);
    const newPoster = new Poster(request.body);
    User.findOne({_id:request.body.user},function (err,user) {
        if(err){
            console.log('THIS IS ERROR RESPONSE')
            response.json(err)
        }else {
            console.log("print user object  "+user)
            newPoster.name = user.username;
            newPoster.save(function (err,ret) {
                if(err){
                    console.log('THIS IS ERROR RESPONSE')
                    response.json(err)
                }else{
                    response.status(200);
                    response.json(newPoster);
                }
            })
        }
    });



};

exports.putPoster = function (request, response) {
    const poster = Object.assign({}, request.body);
    const resolve = (poster) => {
        response.status(200);
        response.json(poster);
    };
    poster._id = request.params.posterId;
    service.updatePoster(request.params.postId,request.body)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
exports.deletePoster = function (request, response) {
    const resolve = (poster) => {
        response.status(200);
        response.json({
            message: 'poster Successfully deleted'
        });
    };
    service.deletePoster(request.params.postId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
exports.listMyPoster = function (request,response) {
    const user = Object.assign({},request.body);
    const resolve = function (poster) {
        response.status(200);
        response.json(poster);
    };
    user._id = request.params.userId;
    service.searchMyPoster(user)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

let renderErrorResponse = function(response){
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};
