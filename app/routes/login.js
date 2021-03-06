/* eslint-disable camelcase, import/newline-after-import */
const express = require('express');
const router = express.Router();
const userData = require('../data/users.json');
const helpers = require('../../app/helpers');


/* GET Login page. */
router.get('/', (req, res, next) => {
  if (req.session.user != null) {
    res.render('index', {
      title: 'Home',
      success: true,
      response: 'Login successful!',
      session: req.session,
    });
  } else {
    res.render('login', {
      title: 'Login',
    });
  }
});


/* process user login attempt */
router.post('/', (req, res, next) => {
  // check if the user login credentials are valid
  const users = helpers.sanitizeJSON(userData);
  const { user_name: uname, user_password: upass } = req.body;

  const userList = Object.keys(users).map(user => users[user]);
  const isValidUser = userList.some(user => user.user_name === uname && user.user_password === upass);


  // if the user login was successful, setup the user session
  if (isValidUser) {
    req.session.cookie.maxAge = 60 * 60 * 1000;
    req.session.user = uname;
    req.session.deployment = null;
    res.redirect('update');
  } else {
    res.render('login', {
      title: 'Login',
      success: false,
      response: 'Login unsuccessful',
      session: req.session,
    });
  }
});


module.exports = router;
