const express = require('express');

const router = express.Router();

/* GET User Settings page. */
router.get('/', (req, res, next) => {
  res.render('settings', {
    title: 'User Settings',
    session: req.session,
  });
});

module.exports = router;
