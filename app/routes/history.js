const express = require('express');

const router = express.Router();

/* GET User History page. */
router.get('/', (req, res, next) => {
  res.render('history', {
    title: 'Deployment History',
    session: req.session,
  });
});

module.exports = router;
