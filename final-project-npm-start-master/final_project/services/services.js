const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Pet = mongoose.model('Pet'),
    Poster = mongoose.model('Poster');

//user operations
//used
exports.searchUser = function (params) {
    const promise = User.find(params).exec();
    return promise;
};
//used
exports.getUser = function (userId) {
    const promise = User.findById(userId).exec();
    return promise;
}
exports.saveUser = function (user) {
    const newUser = new User(user);
    const promise = newUser.save();
    return promise;
}
//used
exports.updateUser = function (userId,user) {
    const promise = User.findOneAndUpdate({_id:userId},user);
    return promise;
};
//used
exports.deleteUser = function (userId) {
    const promise = User.remove({_id:userId});
    return promise;
}


//pet operation
//used
exports.searchPet = function (user) {
    const promise = Pet.find({host:user._id}).populate('host').exec();
    return promise;
}

//add new pet
exports.savePet = function (pet) {
    const newPet = new Pet(pet);
    const promise =newPet.save();
    return promise;
}
//used
exports.getPet = function (petId) {
    const promise = Pet.findById(petId).exec();
    return promise;
}
exports.updatePet = function (petID,pet) {
    const promise = Pet.findOneAndUpdate({_id:petID},pet);
    return promise;
};
exports.deletePet = function (petId) {
    const promise = Pet.remove({_id:petId});
    return promise;
}

//poster operation
exports.searchPoster = function(params){
    const promise = Poster.find(params).exec();
    return promise;
}
exports.getPoster = function(posterId){
    const promise = Poster.findById(posterId).exec();
    return promise
}
exports.savePoster = function(poster) {
    const newPoster = new Poster(poster);
    // const user = User.findById(poster.user);
    // newPoster.name = User.findById(poster.user).username;
    // console.log("print name test"+User.findById(poster.user));
    const promise = newPoster.save();
    return promise;
}
exports.updatePoster = function (posterID,poster) {
    const promise = Poster.findOneAndUpdate({_id:posterID},poster);
    return promise;
};
exports.deletePoster = function (posterId) {
    const promise = Poster.remove({_id:posterId});
    return promise;
}
exports.searchMyPoster = function (user) {
    const promise = Poster.find({user:user._id}).populate('user').exec();
    return promise;
}
//return the objects matching the id



//update and return the objects





//delete


