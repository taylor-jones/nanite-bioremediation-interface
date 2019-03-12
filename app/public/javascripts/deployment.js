/* eslint-disable space-before-function-paren, prefer-arrow-callback, no-undef, func-names, padded-blocks, no-use-before-define */

$(function() {
  // get initial deployment state
  const deploymentStatus = deploymentData ? deploymentData.action : 'inactive';

  // if the initial deployment state is 'active', then we
  // need to prepopulate the dom with some nanites.
  if (deploymentStatus === 'active') {
    deployNanites(deploymentData.nanites, false);
  }


  // Cache DOM elements
  const $radius = $('#radar-radius');
  const $gradient = $('#radar-gradient');
  const $hand = $('#radar-hand');

  const $deploy = $('#deploy');
  const $recall = $('#recall');

  const $deploymentState = $('#deployment-state');
  const $deploymentStateParent = $deploymentState.parent();
  const $deploymentCompletion = $('#deployment-completion');
  const $nanitesDeployed = $('#nanites-deployed');
  const $nanitesRogue = $('#nanites-rogue');
  const $nanites = $('.nanites');

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

  //
  // Functions
  //

  /**
   * Deploys a nanite to a specific relative percentage CSS to the map.
   * If no top and/or left are specified, they will be randomly generated.
   *
   * @param {number (0 - 100)} top the css top that will be set as a percentage
   * @param {number (0 - 100)} left the coss left that will be set as a percentage
   */
  function deployNanite(top = -1, left = -1) {
    // determine an id for this nante and generate the markup
    const naniteId = `nanite-${Number($nanitesDeployed.text()) + 1}`;
    const naniteMarkup = `<div class="nanite" id="${naniteId}"><div class="nanite-inner"></div></div>`;

    // get random top and left values if none were passed
    if (top < 0) top = randInt(100);
    if (left < 0) left = randInt(100);

    // append the nanite to the dom
    $nanites.append(naniteMarkup);
    const $nanite = $(`#${naniteId}`);

    // update the top and left css values
    $nanite.css('top', `${top}%`);
    $nanite.css('left', `${left}%`);
  }


  /**
   * trigger the process of simulating deployment of all nanites
   */
  function deployNanites(count, withInterval = true) {
    let curr = 0;

    const incrementCurrentCount = () => {
      curr += 1;
      $nanitesDeployed.text(curr);
      deployNanite();
    };

    // determine the interval
    const interval = withInterval ? (5000 / count) : 0;

    // loop and place the nanites
    let deployInterval = setInterval(function() {
      if (curr < count) {
        incrementCurrentCount();
      } else {
        clearInterval(deployInterval);
        deployInterval = null;
        requestStateChange('active', count);
      }
    }, interval);
  }



  /**
   * trigger the process of simulating recalling of all nanites
   */
  function recallNanites(withInterval = true) {
    const count = Number($nanitesDeployed.text());
    let curr = count + 1;

    // removes the nanite with the current id from the DOM
    const removeNanite = () => {
      $(`#nanite-${curr}`).remove();
      $nanitesDeployed.text(curr - 1);
      curr -= 1;
    };

    // determine the interval
    const interval = withInterval ? (4987 / count) : 0;

    // loop and place the nanites
    let recallInterval = setInterval(function() {
      if (curr > 0) {
        removeNanite();
      } else {
        clearInterval(recallInterval);
        recallInterval = null;
        requestStateChange('inactive', count);
      }
    }, interval);
  }


  /**
   * Updates the UI to reflect a specified nanite deployment state.
   */
  function updateDeployedState(state) {
    $deploymentStateParent.attr('class', 'list-group-item');

    if (state === 'deploy') {
      $deploymentState.text('Deploying');
      $deploymentCompletion.text(0);
      $deploymentStateParent.addClass('list-group-item-warning');

      $deploy.addClass('disabled');
      $recall.addClass('disabled');

      deployNanites(randInt(15));

    } else if (state === 'active') {
      $deploymentState.text('Active');
      $deploymentCompletion.text(randInt(100));
      $deploymentStateParent.addClass('list-group-item-success');

      $deploy.addClass('disabled');
      $recall.removeClass('disabled');

    } else if (state === 'inactive') {
      $deploymentState.text('Inactive');
      $deploymentCompletion.text('n/a');
      $nanitesDeployed.text('0');
      $nanitesRogue.text('0');

      $deploy.removeClass('disabled');
      $recall.addClass('disabled');

    } else if (state === 'recall') {
      $deploymentState.text('Recalling');
      $deploymentStateParent.addClass('list-group-item-warning');

      $deploy.addClass('disabled');
      $recall.addClass('disabled');

      recallNanites();
    }
  }


  function requestStateChange(state, naniteCount = 0) {
    const deployment = {
      change: new Date(),
      action: state,
      nanites: naniteCount,
    };

    fetch('/deployment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deployment),
    }).then(response => response.json())
      .then(response => {
        updateDeployedState(state);
        return response;
      })
      .then(response => {
        showAlert(response.alert, response.message, 3000);
      });
  }



  //
  // Events
  //

  // set the initial deployment state
  updateDeployedState(deploymentStatus);

  // process the deployment data from the page load
  $deploy.click(function() {
    // requestDeployment();
    requestStateChange('deploy');
  });


  $recall.click(function() {
    // requestRecall();
    requestStateChange('recall');
  });



});
