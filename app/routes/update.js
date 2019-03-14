const express = require('express');
const router = express.Router();
const fs = require('fs');
const currentVersion = "1.2";

router.get('/', (req, res, next) => {
    if (req.session.user != null) {
        let data = fs.readFileSync('./views/partials/navbar.ejs', 'utf-8');
        let version = data.match(/v(\d\.\d)/)[1];
        if (version == currentVersion) {
            res.redirect('/');
            return;
        }
        req.session.version = version;
        res.render('update', {
            title: 'Update',
            version: version,
            newVersion: currentVersion,
            session: req.session,
        });
    } else {
        res.redirect('login');
    }
});

router.post('/', (req, res, next) => {
    // do some updatey stuff
    let data = fs.readFileSync('./views/partials/navbar.ejs', 'utf-8');
    data = data.replace(req.session.version, currentVersion);
    req.session.version = currentVersion;
    fs.writeFile('./views/partials/navbar.ejs', data, 'utf-8', function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
