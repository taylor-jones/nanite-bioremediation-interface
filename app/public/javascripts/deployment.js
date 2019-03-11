/* eslint-disable space-before-function-paren, prefer-arrow-callback, no-undef, func-names, padded-blocks */

$(function() {
  // Cache DOM elements
  const $radius = $('#radar-radius');
  const $gradient = $('#radar-gradient');
  const $hand = $('#radar-hand');

  const $deploy = $('#deploy');
  const $recall = $('#recall');


  /**
   * Radar Map Animation
   */
  TweenMax.set($radius, {
    transformOrigin: 'center',
    scale: 0.1,
    opacity: 0,
  });

  new TimelineMax({ repeat: -1, repeatDelay: 1 })
    .to($radius, 0.5, { opacity: 0.1 })
    .to($radius, 2, { scale: 3.7 }, '-=.5')
    .to($radius, 0.5, { opacity: 0 }, '-=.5');

  TweenMax.to($hand, 3, {
    transformOrigin: 'center bottom',
    rotation: 360,
    ease: Power0.easeOut,
    repeat: -1,
  });

  TweenMax.to($gradient, 3, {
    transformOrigin: 'center',
    rotation: 360,
    ease: Power0.easeOut,
    repeat: -1,
  });


  /**
   * Deployment / Recall
   */
  $deploy.click(function() {
    const deployment = {
      start: new Date(),
      active: true,
    };

    fetch('/deployment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deployment),
    }).then(response => response.json())
      .then(res => {
        showAlert(res.alert, res.message, 3000);
      });
  });


  $recall.click(function() {
    const deployment = {
      start: new Date(),
      active: false,
    };

    fetch('/deployment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deployment),
    }).then(response => response.json())
      .then(res => {
        showAlert(res.alert, res.message, 3000);
      });
  });


});
