/**
 * Module dependencies
 */
// var m = require("../lib/middleware");

/**
 * Expose the api routes
 */
module.exports = function(app) {

  // TODO do we need app.restrict and check if they're a member here?

  app.get("/", function(req, res, next) {
    res.redirect('/blog');
  });

};
