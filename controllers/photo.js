/**
 * Module dependencies
 */
var Tumblr = require('tumblr').Tumblr
  , Flickr = require('flickrnode').FlickrAPI
  , HttpError = require("http-error").HttpError
  , sys= require('sys')
  , moment = require('moment');


/**
 * 
 */
var FLICKR_KEY = process.env.FLICKR_KEY
 , FLICKR_SECRET = process.env.FLICKR_SECRET;

var flickr = new Flickr(FLICKR_KEY, FLICKR_SECRET);


/**
 * Expose the api routes
 */
module.exports = function(app) {

  app.get("/photo", photosets, function(req, res, next) {
    res.render('photosets',{title:'Photo'});
  });

  app.get("/photos/:id/:slug", photos, function(req, res, next) {
    res.render('photos');
  });


};


function photosets(req, res, next) {
  flickr.photosets.getList('60612635@N06',function(error, photoset) {
    // console.log(photoset);
    
    res.locals({
      photosets: photoset
    });
    next();
  });
}

function photos(req, res, next) {
  var photosetId = req.params.id
  flickr.photosets.getPhotos(photosetId,{},function(error, photoset) {
    console.log(photoset);
    
    res.locals({
      photoset: photoset
    });
    next();
  });
}