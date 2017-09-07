import express from 'express';
const Review = require('../models/review');

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'HawkerSG'
  });
});

/* GET hawker page. */
router.get('/hawker',isLoggedIn,(req, res, next) => {
  Review.find(function(err, result) {
            console.log("Review data: " + result);
            if (err) return next(err);
            res.render('hawker', {
              data : result
              //servicelist1 : result.servicelist
            })
          });
});

/* GET profile page. */
router.get('/profile',isLoggedIn,(req, res, next) => {
  res.render('profile', {
    title: 'HawkerSG'
  });
});

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
