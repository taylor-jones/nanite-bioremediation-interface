/* eslint-disable camelcase, import/newline-after-import */
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.user == null) {
    res.render('login', {
      title: 'Login',
    });
  } else {
    res.render('index', {
      title: 'Bioremediation',
      session: req.session,
    });
  }
});


/**
 * Process a user logout.
 * Destroy the session and redirect to the login page.
 */
router.get('/logout', (req, res, next) => {
  // if there's a current session, then destory it and
  // give a response that the user was successfully logged out.
  if (req.session.user) {
    req.session.destroy();
    res.render('login', {
      title: 'Login',
      success: true,
      response: 'Successfully logged out',
    });
  } else {
    // if there was no user session, just redirect to the login page.
    res.render('login', {
      title: 'Login',
      success: false,
    });
  }
});


module.exports = router;
