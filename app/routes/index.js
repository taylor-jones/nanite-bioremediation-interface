const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session || !req.session.expires) {
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
  req.session.destroy();
  res.render('login', {
    title: 'Login',
    success: true,
    response: 'Successfully logged out',
  });
});

module.exports = router;
