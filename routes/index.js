import express from 'express';
const Review = require('../models/review');

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    user : req.user
  });
});

/* GET hawker page. */
router.get('/hawker',(req, res, next) => {
  Review.find(function(err, result) {
            console.log("Review data: " + result);
            if (err) return next(err);
            res.render('hawker', {
              data : result,
              user : req.user
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



// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}

export default router;
