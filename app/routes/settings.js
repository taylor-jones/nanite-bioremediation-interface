const express = require('express');
const router = express.Router();
const userData = require('../data/users.json');
const settingsData = require('../data/settings.json');
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
  const settings = helpers.sanitizeJSON(settingsData)[user.user_id];
  res.render('settings', {
    title: 'User Settings',
    session: req.session,
    user_name: req.session.user,
    settings: settings
  });
});

router.post('/', (req, res, next) => {
  const uname = req.session.user;
  if (uname == null) res.redirect('/login');

  const users = helpers.sanitizeJSON(userData);
  const user = userData.filter(user => user["user_name"] == uname)[0];
  let settings = helpers.sanitizeJSON(settingsData)[user.user_id];

  // set all the settings here
  settings.user.email = req.body.email;
  settings.user.code_device = req.body.code_device;
  settings.user.permanent_code = req.body.permanent_code;

  settings.history.local_count = req.body.local_count;
  settings.history.local_format = req.body.local_format;
  settings.history.storage_location = req.body.storage_location;
  settings.history.download_directory = req.body.download_directory;

  settings.system.time_zone = req.body.time_zone;
  settings.system.updates_enables = req.body.updates_enables;
  settings.system.localization_enabled = req.body.localization_enabled;

  settings.mapping.gpu = req.body.gpu;
  settings.mapping.quality = req.body.quality;
  settings.mapping.color = req.body.color;

  console.log(helpers.sanitizeJSON(req.body));

  settings.nanite.driver_storage = req.body.nanite.driver_storage;
  settings.nanite.my_drivers = req.body.nanite.my_drivers;
  settings.nanite.my_algos = req.body.nanite.my_algos;
  //deal with the two arrays and we're done building

  // write the json out to the file with the userid

  res.render('settings', {
    title: 'User Settings',
    session: req.session,
    user_name: req.session.user,
    settings: settings
  });
});

// I'll stay consistent
router.put('/updateUserProfile', (req, res) => {
  //request update on the elements passed in

});
// I think 2, only update per field

module.exports = router;