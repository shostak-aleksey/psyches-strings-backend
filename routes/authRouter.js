const express = require('express');
const passport = require('passport');
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      profile.type = [null]; // Add your desired strings here
      return done(null, profile);
    },
  ),
);

// Сериализация и десериализация пользователя
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'profile',
      'email',
      'openid',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/google/failure',
  }),
  (req, res) => {
    res.json(req.user);
    console.log('2222222222222222222 ', req.user);
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
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Logged out successfully' });
    });
  });
});

router.get('/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('Authenticated', req.user);
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

module.exports = router;
