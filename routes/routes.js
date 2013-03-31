var controller = require('../controllers/controller.js'),
    auth = require('../models/authentication.js'),
    passport = require('passport');

module.exports = function(app) {

  app.get('/', function(req, res){
    controller.index(req, res, function(error, view, data) {
      res.render(view, data);
    });
  });

  
  // passport.authenticate('local', { failureRedirect: '/login'}),
  // function(req, res) {
  //   if(req.session.redirect_to !== undefined && req.session.redirect_to !== '/login'){
  //     res.redirect(req.session.redirect_to);
  //   } else {
  //     res.redirect('/');
  //   }
  // });

  // GET /auth/facebook
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Facebook authentication will involve
  //   redirecting the user to facebook.com.  After authorization, Facebook will
  //   redirect the user back to this application at /auth/facebook/callback
  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){
      // The request will be redirected to Facebook for authentication, so this
      // function will not be called.
    });

  // GET /auth/facebook/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });






  app.get('/single', function(req, res){
    controller.single(req, res, function(error, view, data) {
      res.render(view, data);
    });
  });


  // HABITS
  app.get('/tasks', auth, function(req, res){
    controller.tasks(req, res, function(error, view, data) {
      res.render(view, data);
    });
  });
  app.get('/task/new', auth, function(req, res){
    controller.newTask(req, res, function(error, view, data) {
      res.render(view, data);
    });
  });
  app.post('/task/new', auth, function(req, res){
    controller.postNewTask(req, res, function(error, view, data) {
      res.render(view, data);
    });
  });


  // USERS
  app.get('/user/new', function(req, res){
    controller.newUser(req, res, function(error, view, data){
      res.render(view, data);
    });
  });

  app.post('/user/new', function(req, res){
    controller.createNewUser(req, res, function(error, user){
      res.send(user);
    });
  });

}