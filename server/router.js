const express = require('express'),
      passportService = require('./config/passport'), 
      passport = require('passport');
      AuthenticationController = require('./controllers/authentication'),
      WorkersController = require('./controllers/workers');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });  

// Constants for role types
const REQUIRE_ADMIN = "Admin",  
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member";

module.exports = function(app) {  
// Initializing route groups
const apiRoutes = express.Router(),
        authRoutes = express.Router();

//=========================
// Auth Routes
//=========================

// Create endpoint handlers for /workers
apiRoutes.route('/workers')
      .post(WorkersController.postWorker)
      .get(WorkersController.getWorkers);

// Create endpoint handlers for /workers/:worker_id
apiRoutes.route('/workers/:worker_id')
      .get(WorkersController.getWorker)
      .put(WorkersController.putWorker)
      .delete(WorkersController.deleteWorker);

// Registration route
authRoutes.route('/register')
      .post(AuthenticationController.register);

// Login route
authRoutes.route('/login')
      .post(requireLogin, AuthenticationController.login);

// Set auth routes as subgroup/middleware to apiRoutes
apiRoutes.use('/auth', authRoutes);

// Set url for API group routes
app.use('/api', apiRoutes);

};