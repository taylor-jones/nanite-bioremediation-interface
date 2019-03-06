const express = require('express');
const router = express.Router();
const userData = require('../data/users.json');
const settingsData = require('../data/settings.json');
const helpers = require('../../app/helpers');

/* GET User Settings page. */
router.get('/', (req, res, next) => {
  const uname = req.session.user;
  if (uname == null) res.redirect('/login');

  const users = helpers.sanitizeJSON(userData);
  const user = userData.filter(user => user["user_name"] == uname)[0];
  const settings = helpers.sanitizeJSON(settingsData)[user.user_id];
  res.render('settings', {
    title: 'User Settings',
    session: req.session,
    user_name: req.session.user,
    settings: settings
  });
});

router.post('/', (req, res, next) => {
  // ok so the idea here is to take all of the fields and just reassmble
  // the map and update it as a blob object
  let settings = {"user": {"email": req.body.email, ""}};
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.code_device);
});

// I'll stay consistent
router.put('/updateUserProfile', (req, res) => {
  //request update on the elements passed in

});
// I think 2, only update per field

module.exports = router;