const express = require('express');
const router = express.Router();
const userData = require('../data/users.json');
const historyData = require('../data/history.json');
const helpers = require('../../app/helpers');

/* GET User Settings page. */
router.get('/', (req, res, next) => {
  const uname = req.session.user;
  if (uname == null) {
    res.redirect('/login');
    return;
  }

  const users = helpers.sanitizeJSON(userData);
  const user = userData.filter(user => user["user_name"] === uname)[0];
  const history = helpers.sanitizeJSON(historyData)[user.user_id];
 

  res.render('history', {
    title: 'Deployment History',
    session: req.session,
    user_name: req.session.user,
    history: history,
    date: req.body.date,

  

    
  });
});






module.exports = router;