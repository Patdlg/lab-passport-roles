const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user)
    return next()
  } else {
    res.redirect('/login');
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/private')
  } else {
    next();
  }
}

router.get('/logout', (req, res, next) => {
  req.logout();
  // res.send('cerrado ??? ');
  res.redirect('/login');

});

router.get('/private', isAuthenticated, (req, res) => {
  const boss = req.user.role === "Boss";
  res.render("boss", { boss });
});


router.get('/login', isLoggedIn, (req, res) => {
  res.render('auth/login')
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  req.app.locals.user = req.user;
  res.redirect('/private');

});

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});


router.post('/signup', (req, res, next) => {

  User.register(req.body, req.body.password)
    .then(user => res.redirect('/login'))
    .catch(e => next(e));


})

router.delete('/boss', (req, res, next) => {

  User.register(req.body, req.body.password)
    .then(user => res.redirect('/boss'))
    .catch(e => next(e));

})

module.exports = router;