module.exports=function (app) {
    const controller = require('../controllers/controller');
    //login
    app.route('/login')
        .post(controller.login);
    //register
    app.route('/users')
        .get(controller.listUser)
        .post(controller.postUser);
    app.route('/users/:userId')
        .get(controller.getUser)
        .put(controller.putUser)
        .delete(controller.deleteUser);

    //process pets
    app.route('/users/:userId/pets')
        .get(controller.listPet)
        .post(controller.postPet);
    app.route('/users/:userId/pets/:petId')
        .get(controller.getPet)
        .put(controller.putPet)
        .delete(controller.deletePet);
    //process poster
    app.route('/users/:userId/poster')
        .get(controller.listMyPoster)
        .post(controller.postPoster);
    app.route('/users/:userId/poster/:postId')
        .get(controller.getPoster)
        .put(controller.putPoster)
        .delete(controller.deletePoster);
    //list all poster
    app.route('/posters')
        .get(controller.listPoster);
    app.route('/poster/:posterId')
        .get(controller.getPoster);



}
