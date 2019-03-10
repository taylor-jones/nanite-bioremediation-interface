/* eslint-disable import/newline-after-import */
const express = require('express');
const historyData = require('../data/history.json');
const userData = require('../data/users.json');
const router = express.Router();



/* GET User History page. */
router.get('/', (req, res) => {
  const username = req.session.user;
  const user = userData.filter(u => u.user_name === username)[0];

  if (!user) {
    res.redirect('/login');
  } else {
    const history = historyData
      .filter(d => d.user_id === user.user_id)
      .sort((a, b) => {
        return new Date(b.deployment_date) - new Date(a.deployment_date);
      });

    console.log('user', user);
    console.log('history', history);

    res.render('history', {
      title: 'Deployment History',
      session: req.session,
      records: history,
    });
  }
});


module.exports = router;
