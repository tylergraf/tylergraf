#!/usr/bin/env node

var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , util = require('util')
  , expressLayouts = require('express-ejs-layouts');


var app = module.exports = express();


app.configure(function(){
  app.set('port', 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options',{layout: 'layout'});
  app.use(express.favicon());
  app.use(expressLayouts);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

   // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var controllers_path = __dirname + '/controllers'
  , controller_files = fs.readdirSync(controllers_path)
controller_files.forEach(function (file) {
  require(controllers_path+'/'+file)(app)
})

// Error handler
  // TODO remove when woodruff has this.
  app.use(function(err, req, res, next) {
    // Pass it on the the notFound handler
    if(err.code === 404) return next();

    // If it's a server error, print it
    (!err.code || err.code > 499) ? console.error(err.stack || err) : console.warn(err.stack || err);

    if(req.xhr) {
      res.send({error: {message: err.message, stack: err.stack}}, err.code || 500);
    }
    else {
      res.render('error', {
        error: err
      }, function(error, body) {
        if(error) return res.send(error.stack || error);
        res.send(body, err.code || 500);
      });
    }
  });
// LOAD ROUTES AND CONTROLLERS
// require('./routes/routes.js')(app);
// INIT AUTH
// require('./models/authentication.js')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

