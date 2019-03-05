const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Bioremediation',
    session: req.session,
  });
});


/**
 * Process a user logout.
 * Destroy the session and redirect to the home page.
 */
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
