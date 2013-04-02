/**
 * Module dependencies
 */
var superagent = require("superagent");
    

/**
 * Defines
 */
var VIMEO_URL = process.env.VIMEO_URL || "http://vimeo.com/api/v2";
var OEMBED_URL = process.env.OEMBED_URL || "http://vimeo.com/api/oembed.json";

/**
 * Call the scope of interest service
 */
exports.films = function(param1, param2, done) {
  VIMEO_URL += '/'+param1;
  VIMEO_URL += '/'+param2;
  VIMEO_URL += '.json';
  superagent
    .get(VIMEO_URL)
    .set("accept", "application/json")
    .end(function(err, res) {
      if(err) return done(err);
      if(res.ok) return done(null, res.body);

      done(new Error(res.text));
    });
};

/**
 * Submit a scope of interest request
 */
exports.film = function(id, done) {
  superagent
    .get(OEMBED_URL)
    .query({url: 'http://vimeo.com/'+id})
    // .query({iframe: false})
    .set("contentType", "application/json")
    .set("accept", "application/json")
    .end(function(err, res) {
      if(err) return done(err);
      if(res.ok) return done(null, res.body);

      done(new Error(res.text));
    });
};


function paramifyJSON(obj){
 return JSON.parse('{"' + decodeURI("abc=foo&def=%5Basf%5D&xyz=5".replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
}