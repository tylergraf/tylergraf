// /**
//  * Module dependencies
//  */
// var cas = require("../services/cas")
//   , soi = require("../services/soi")
//   , user = require("../services/user")
//   , debug = require("debug")("temple:middleware");


// /**
//  * Make CAS call to check if user is a member
//  */
// exports.member = function member(req, res, next) {
//   if(!req.user) return next();

//   debug('fs-highconf cookie:',req.cookies['fs-highconf']);
//   if(req.cookies['fs-highconf'] !== undefined && !req.cookies['fs-highconf']) return next();
  
//   cas("FtMemberUiPermission", req.user.sessionId, function(err, role) {
//     if(err) return next(err);

//     req.user.isMember = role.authorized;
//     debug('Member Status:',role.authorized);
//     next();
//   });
// };

// /**
//  * Redirects to lds.org if not a member
//  */
// exports.nonMemberRedirect = function nonMemberRedirect(req, res, next) {
//   if(!req.user || !req.user.isMember) return res.redirect("http://www.lds.org/church/temples/why-we-build-temples");
//   next();
// };

// /**
//  * Makes a scope of interest call
//  */
// exports.soiCall = function soiCall(req, res, next) {
//   function handle (err, soiRequest) {
//     if(err) return next(err);
//     res.locals({soiRequest: soiRequest});
//     req.soi = soiRequest;
//     next();
//   }

//   if(req.method === "GET") {
//     soi.lastSoiRequest(req.user.sessionId, handle);
//   }
//   else {
//     var options = {
//       a: req.body.generationsUp,
//       d: req.body.generationsDown
//     }
//     debug('options',options)

//     soi.submitSoiRequest(req.user.sessionId, options, handle);
//   }
// };

// /**
//  * Get the cpUserId for the current user
//  */
// exports.cpUserId = function cpUserId (req, res, next) {
//   user(req.user.sessionId, function(err, user) {
//     if(err) return next(err);

//     req.user.cpUserId = (user.proxyContact === null) ? user.cpUserId : user.proxyContact.cpUserId
//     next();
//   });
// };
