// module.exports = function(req, res, next){
//   if (req.isAuthenticated()) { 
//     return next(); 
//   } else {
//     req.session.redirect_to = req.path;
//     res.redirect('/login')
//   }
  
// }

// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy,
//     FacebookStrategy = require('passport-facebook').Strategy,
//     api = require('./api.js'),
//     bcrypt = require('bcrypt'),
//     FACEBOOK_APP_ID = "221940774496427",   
//     FACEBOOK_APP_SECRET = "4d1783cda2bb7607052df25a6a79d85a";



// // Passport session setup.
// //   To support persistent login sessions, Passport needs to be able to
// //   serialize users into and deserialize users out of the session.  Typically,
// //   this will be as simple as storing the user ID when serializing, and finding
// //   the user by ID when deserializing.
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   api.findById(id, function (err, user) {
//     done(err, user);
//   });
// });



// // Use the FacebookStrategy within Passport.
// //   Strategies in Passport require a `verify` function, which accept
// //   credentials (in this case, an accessToken, refreshToken, and Facebook
// //   profile), and invoke a callback with a user object.
// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
      
//       // To keep the example simple, the user's Facebook profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the Facebook account with a user record in your database,
//       // and return that user instead.
//       return done(null, profile);
//     });
//   }
// ));



//   // Use the LocalStrategy within Passport.
// //   Strategies in passport require a `verify` function, which accept
// //   credentials (in this case, a username and password), and invoke a callback
// //   with a user object.  In the real world, this would query a database;
// //   however, in this example we are using a baked-in set of users.
// passport.use(new LocalStrategy(
//   function(username, password, callback) {
//     // asynchronous verification, for effect...
      
//       // Find the user by username.  If there is no user with the given
//       // username, or the password is not correct, set the user to `false` to
//       // indicate failure and set a flash message.  Otherwise, return the
//       // authenticated `user`.
//       api.findByUsername(username, function(err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
//         bcrypt.compare(password, user.password, function(err, res) {
//           if(err || !res){
//             return callback(err);
//           } else {
//             return callback(null, user);
//           }
//         });
//       })
//   }
// ));

