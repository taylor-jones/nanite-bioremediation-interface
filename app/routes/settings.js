/* eslint-disable camelcase, import/newline-after-import, object-shorthand */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const userData = require('../data/users.json');
const settingsData = require('../data/settings.json');
const helpers = require('../../app/helpers');

/**
 * Updates the JSON in settings.json with the contents of
 * a settings object. First, the object is formatted to JSON
 * and then it's used to update the entire contents of the JSON
 * file. NOTE: Make sure you pass the entire settings object
 * with desired changes.
 */
const updateSettingsJson = newSettings => {
  const json = JSON.stringify(newSettings, null, 4);
  fs.writeFile(`${__dirname}/../data/settings.json`, json, (err => {
    if (err) console.log(err);
    console.log('SETTINGS.JSON UPDATED');
  }));
};


/* GET User Settings page. */
router.get('/', (req, res, next) => {
  const uname = req.session.user;
  if (uname == null) {
    res.redirect('/login');
    return;
  }

  const user = userData.filter(u => u.user_name === uname)[0];
  const settings = helpers.sanitizeJSON(settingsData)[user.user_id];
  res.render('settings', {
    title: 'User Settings',
    session: req.session,
    user_name: req.session.user,
    settings: settings,
  });
});


/** POST USER Settings to settings.json */
router.post('/', (req, res, next) => {
  const uname = req.session.user;

  if (uname == null) {
    res.redirect('/login');
  } else {
    const user = userData.filter(u => u.user_name === uname)[0];
    const settings = helpers.sanitizeJSON(settingsData)[user.user_id];
    const post = req.body;
  
    // set all the settings here
    settings.user.email = post.email;
    settings.user.code_device = post.code_device;
    settings.user.permanent_code = post.permanent_code;
  
    settings.history.local_count = post.local_count;
    settings.history.local_format = post.local_format;
    settings.history.storage_location = post.storage_location;
    settings.history.download_directory = post.download_directory;
  
    settings.system.time_zone = post.time_zone;
    settings.system.updates_enabled = post.updates_enabled === 'on';
    settings.system.localization_enabled = post.localization_enabled === 'on';
  
    // parse nanites
    settings.nanite.my_drivers = helpers.ensureArray(post.my_drivers);
    settings.nanite.my_algos = helpers.ensureArray(post.my_algos);
    settings.nanite.driver_storage = post.driver_storage;
  
    settings.mapping.gpu = post.gpu === 'on';
    settings.mapping.quality = post.quality;
    settings.mapping.color = post.color === 'on';
  
    // console.log(helpers.sanitizeJSON(req.body));
  
    // TODO: just need to setup the front-end to allow multiple selection
    // for my_drivers and my_algos (i think)
  
    // write the json out to the file with the userid
    // update the settings.json file to include the new settings
    settingsData[user.user_id] = settings;
    updateSettingsJson(settingsData);
  
    // NOTE: ?? we may not actually need to re-render the settings,
    // since they're already at the last-updated values.


    res.render('settings', {
      title: 'User Settings',
      session: req.session,
      user_name: req.session.user,
      settings: settings,
    });
  }
});


module.exports = router;
