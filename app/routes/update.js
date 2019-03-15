const express = require('express');
const router = express.Router();
const fs = require('fs');
const versionData = require('../data/versions.json');
const helpers = require('../../app/helpers');
const currentVersion = 1.2;

router.get('/', (req, res, next) => {
    if (req.session.user != null) {
        const versions = helpers.sanitizeJSON(versionData);
        if (versions[req.session.user] == currentVersion) {
            res.redirect('/');
            return;
        }
        req.session.version = versions[req.session.user];
        res.render('update', {
            title: 'Update',
            version: req.session.version,
            newVersion: currentVersion,
            session: req.session,
        });
    } else {
        res.redirect('login');
    }
});

router.post('/', (req, res, next) => {
    let versions = helpers.sanitizeJSON(versionData);
    versions[req.session.user] = currentVersion;
    req.session.version = currentVersion;
    const json = JSON.stringify(versions, null, 4);
    fs.writeFile(`${__dirname}/../data/versions.json`, json, (err => {
        if (err) console.log(err);
        console.log('versions.json updated');
        res.redirect('/');
    }));
});

module.exports = router;
