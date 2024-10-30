const express = require('express');
const passport = require('passport');
const router = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/google/failure',
  }),
  (req, res) => {
    res.json(req.user);
  },
);

router.get('/protected', isLoggedIn, (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Pass the error to the error handler
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err); // Pass the error to the error handler
      }
      res.json(req.user);
    });
  });
});

router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

module.exports = router;
