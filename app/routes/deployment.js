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
    res.render('deployment', {
      title: 'Deployment',
      session: req.session,
    });
  }
});



module.exports = router;
