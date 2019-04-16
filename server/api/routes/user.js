module.exports = function (app) {
  const UserController = require('../controllers/user-controller');
  /**
   * @desc User Routes for search and create.
    */
  app.route('/users').get(UserController.getAll)
    .post(UserController.post);

  /**
   * @desc User Routes for get, update and delete.
   */
  app.route('/users/:userId').get(UserController.getOne)
    .put(UserController.put)
    .delete(UserController.delete);

  const loginController = require('../controllers/loginController');
  /** 
   * @desc userlogin Routes for search and create
   */
  app.route('/login')
    .post(loginController.getUser)

  /**
   * @desc userlogin Routes for get, update and delete
   */
  app.route('/register')
    .post(loginController.post)
};
