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
    if (req.body.action === 'deploy') {
      // deployment
      res.status(200).send({
        alert: 'warning',
        message: `<h5 class="alert-heading">Deploying!</h5>
          <p class="mb-0">Nanites are being deployed to the target location.</p>`,
      });
    } else if (req.body.action === 'recall') {
      // recall
      res.status(200).send({
        alert: 'warning',
        message: `<h5 class="alert-heading">Recalling!</h5>
          <p class="mb-0">Nanites are being recalled to their point-of-origin.</p>`,
      });
    } else if (req.body.action === 'active') {
      // active
      res.status(200).send({
        alert: 'success',
        message: `<h5 class="alert-heading">Success!</h5>
          <p class="mb-0">All nanites have been deployed.</p>`,
      });
    } else if (req.body.action === 'inactive') {
      // inactive
      res.status(200).send({
        alert: 'success',
        message: `<h5 class="alert-heading">Success!</h5>
          <p class="mb-0">All nanites have been recalled.</p>`,
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
