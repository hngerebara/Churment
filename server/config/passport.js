// Importing Passport, strategies, and config
const passport = require('passport'),  
      User = require('../models/users'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'username' };  

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {  
    User.findOne({ username: username }, function(err, user) {
      if(err) { return done(err); }
      if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
  
      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }
  
        return done(null, user);
      });
    });
  });

  const jwtOptions = {  
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    // Telling Passport where to find the secret
    secretOrKey: config.secret
  };

  // Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  
    console.log(paload, "payload")
    User.findById(payload._id, function(err, user) {
      if (err) { return done(err, false); }
  
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });

passport.use(jwtLogin);  
passport.use(localLogin);  

// var passport = require("passport");  
// var passportJWT = require("passport-jwt");  
// var users = require("../models/users.js");  
// var config = require("./main.js");  
// var ExtractJwt = passportJWT.ExtractJwt;  
// var Strategy = passportJWT.Strategy;

// var JwtStrategy = require('passport-jwt').Strategy;  
// var ExtractJwt = require('passport-jwt').ExtractJwt;  
// var User = require('../models/users');  
// var config = require('../config/main');

// var params = {  
//     secretOrKey: config.secret,
//     jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
// };

// Setup work and export for the JWT passport strategy
// module.exports = function(passport) {  
//   var opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//   opts.secretOrKey = config.secret;
//   passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.id}, function(err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         done(null, user);
//       } else {
//         done(null, false);
//       }
//     });
//   }));
// };

// module.exports = function() {  
//     var strategy = new Strategy(params, function(payload, done) {
//         var user = users[payload.id] || null;
//         if (user) {
//             return done(null, {
//                 id: user.id
//             });
//         } else {
//             return done(new Error("User not found"), null);
//         }
//     });
//     passport.use(strategy);
//     return {
//         initialize: function() {
//             return passport.initialize();
//         },
//         authenticate: function() {
//             return passport.authenticate("jwt", config.jwtSession);
//         }
//     };
// };