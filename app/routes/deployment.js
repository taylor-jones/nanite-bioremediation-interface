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
      deployment: req.session.deployment,
    });
  }
});


router.post('/', (req, res) => {
  if (req.body) {
    req.session.deployment = req.body;

    // check if it was a deployment or a recall
    if (req.body.active) {
      // deployment
      res.status(200).send({
        alert: 'success',
        message: 'Nanites are begin deployed!',
      });
    } else {
      // recall
      res.status(200).send({
        alert: 'success',
        message: 'Nanites are begin recalled!',
      });
    }
  } else {
    res.status(500).send({
      alert: 'danger',
      message: 'Something has gone wrong...',
    });
  }
});



module.exports = router;
