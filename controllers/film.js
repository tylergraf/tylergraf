/**
 * Module dependencies
 */
var superagent = require('superagent')
  , HttpError = require("http-error").HttpError
  , moment = require('moment')
  , vimeo = require('../services/vimeo.js');


/**
 * 
 */


/**
 * Expose the api routes
 */
module.exports = function(app) {

  app.get("/film", films, function(req, res, next) {
    
    res.render('films',{title:'Films'});
  });

  // app.get("/blog/page/:page", posts, function(req, res, next) {
  //   if(req.params.page <= 1)res.redirect('/blog');
  //   res.render('posts',{title:'Posts'});
  // });

  // app.get("/blog/tag/:tag", tag, function(req, res, next) {
  //   res.render('posts',{title:'Posts'});
  // });

  app.get("/film/:id/:slug", film, function(req, res, next) {
    res.render('film',{title:'Film'});
  });


};


function films(req, res, next) {
  vimeo.films('tylergraf','videos',function(err, films){
    if(err){res.render('error');}
    console.log(films);
    res.locals({films: films});
  next();
  });
    
  
}

function film(req, res, next) {
  var filmId = (req.params.id) ? req.params.id : 0
  
  vimeo.film(filmId,function(err, film){
    if(err){res.render('error');}
    console.log(film);
    res.locals({film: film});
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