import express from 'express';
const router = express.Router();
const User = require('../models/user');
const Review = require('../models/review');

const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;


/* Review- POST ===============================================================*/
router.post('/review', (req, res, next) => {
  const subject = req.body.subject;
  const comment = req.body.comment;
  const rating = req.body.rating;
  const userid = req.user.id;

  const review = new Review({
        subject        : subject,
        comment        : comment,
        rating         : rating,
        userid         : userid
  });

  review.save((err, review) => {
    console.log('Review saved');
    if(err){
      console.log(err);
      res.render('hawker', {
        user : req.user
      });
    }
    console.log(review);
    res.redirect('/hawker');
  });

});


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

  // locally --------------------------------
      // LOGIN ===============================
      // show the login form
      router.get('/login', function(req, res) {
          res.render('login', { message: req.flash('loginMessage') });
      });

      // process the login form
      router.post('/login', passport.authenticate('local-login', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

      // SIGNUP =================================
      // show the signup form
      router.get('/signup', function(req, res) {
          res.render('signup', { message: req.flash('signupMessage') });
      });

      // process the signup form
      router.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/login', // redirect to the secure profile section
          failureRedirect : '/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

  // facebook -------------------------------

      // send to facebook to do the authentication
      router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

      // handle the callback after facebook has authenticated the user
      router.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              successRedirect : '/profile',
              failureRedirect : '/'
          }));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

  // facebook -------------------------------

      // send to facebook to do the authentication
      router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

      // handle the callback after facebook has authorized the user
      router.get('users/connect/facebook/callback',
          passport.authorize('facebook', {
              successRedirect : '/profile',
              failureRedirect : '/'
          }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  router.get('/unlink/local', isLoggedIn, function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  // facebook -------------------------------
  router.get('/unlink/facebook', isLoggedIn, function(req, res) {
      var user            = req.user;
      user.facebook.token = undefined;
      user.save(function(err) {
          res.redirect('/');
      });
  });

//};

// LOGOUT ==============================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}



export default router;
