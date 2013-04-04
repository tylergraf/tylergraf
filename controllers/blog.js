/**
 * Module dependencies
 */
var Tumblr = require('tumblr').Tumblr
  , HttpError = require("http-error").HttpError
  , moment = require('moment');


/**
 * 
 */
var blog = new Tumblr('solenoled.tumblr.com', process.env.TUMBLR_KEY);


/**
 * Expose the api routes
 */
module.exports = function(app) {

  app.get("/blog", posts, function(req, res, next) {
    res.render('posts',{title:'Posts'});
  });

  app.get("/blog/page/:page", posts, function(req, res, next) {
    if(req.params.page <= 1)res.redirect('/blog');
    res.render('posts',{title:'Posts'});
  });

  app.get("/blog/tag/:tag", tag, function(req, res, next) {
    res.render('posts',{title:'Posts'});
  });

  app.get("/post/:id/:slug", post, function(req, res, next) {
    res.redirect('/blog/'+req.params.id+'/'+req.params.slug);
  });
  
  app.get("/blog/:id/:slug", post, function(req, res, next) {
    res.render('posts',{title:'Posts'});
  });


};


function posts(req, res, next) {
  var offset = (req.params.page) ? (req.params.page) * 10 : 0
  blog.posts({limit: 10,offset: offset},function(err, response) {
    if(err) return next(err);
    if(response.err) return next(err);


    console.log(response);

    for (var i = 0; i < response.posts.length; i++) {
      response.posts[i].moment = moment(response.posts[i].date).format('MM.D.YYYY');
    };
    
    res.locals({
      posts: response.posts, 
      totalPosts: response.total_posts,
      pageNumber: (req.params.page !== undefined) ? parseInt(req.params.page) : 1
    });
    next();
  });
}

function post(req, res, next) {
  var postId = (req.params.id) ? req.params.id : 0
  blog.posts({limit: 1, id: postId},function(err, response) {
    if(err) return next(err);

      for (var i = 0; i < response.posts.length; i++) {
        response.posts[i].moment = moment(response.posts[i].date).format('MM.D.YYYY');
      };
      res.locals({
        posts: response.posts, 
        totalPosts: response.total_posts,
        pageNumber: null
      });
      
      next();
  });
}

function tag(req, res, next) {
  console.log('got here');
  var tag = req.params.tag;
  blog.posts({limit: 100, tag: tag},function(err, response) {
    if(err) return next(err);
      console.log(response);
      for (var i = 0; i < response.posts.length; i++) {
        response.posts[i].moment = moment(response.posts[i].date).format('MM.D.YYYY');
      };
      res.locals({
        posts: response.posts, 
        totalPosts: response.total_posts,
        pageNumber: null,
        pageType: 'tag',
        tag: req.params.tag
      });
      
      next();
  });
}