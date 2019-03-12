/* eslint-disable space-before-function-paren, prefer-arrow-callback, no-undef, func-names, padded-blocks */


/**
 * NOTE: Functions placed before the IIFE will be available to other JS files.
 */

/**
   * shows an alert to the user of a given type with provided text
   *
   * @param {string} type - bootstrap alert type class
   * @param {string} text - the text to display in the alert
   * @param {duration} number - the length of time to show the alert
   */
function showAlert(type, text, duration = -1) {
  const $alertContainer = $('#alert-container');
  const renderHTML = `
    <div class="alert alert-${type}" role="alert">
      <div class="alert-text">${text}</div>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>  
    </div>`;

  // update the alert container with the new content
  // and show the alert.
  $alertContainer.html(renderHTML);
  $alertContainer.addClass('show');

  // if a duration was argued, then fade the alert
  // out after the specified duration
  if (duration > 0) {
    setTimeout(function() {
      $alertContainer.removeClass('show');
    }, duration);
  }
}


/**
 * Returns an random integer between 0 and a given max value
 * @param {int} maxValue - the max allowed random number to be generated.
 */
function randInt(maxValue) {
  return Math.floor(Math.random() * Math.floor(maxValue));
}



/**
 * NOTE: This file is included in the pageScripts.js EJS partial,
 * so any code here will be present on all pages in the application.
 * If you're writing JS for a specific page, consider creating a new
 * JS file and linking the page directly to that JS file rather than
 * including that code everywhere.
 */

$(function() {
  //
  // Variables
  //
  const $body = $('body');
  const $logoutButton = $('#menu-logout');
  let logoutInterval;



  //
  // Functions
  //

  /**
   * Processes a request to logout by calling a GET request
   * to the /logout route. If a response of 200 is received,
   * then the user is logged out and redirected to the login
   * page.
   */
  function processLogout() {
    fetch('/logout', {
      method: 'GET',
      redirect: 'follow',
    }).then((response) => {
      if (response.status === 200) {
        window.location = '/login';
      } else {
        showAlert('danger', 'Something went wrong...');
      }
    });
  }



  //
  // Events
  //

  // right away, make sure the alert container exists on every page
  $body.append(`<!-- response alert -->
  <div id="alert-container" class="container fade show">
    <div class="row">
      <div class="col">
      </div>
    </div>
  </div>`);


  /**
   * Process the logout
   */
  $logoutButton.click(function(e) {
    e.preventDefault();

    // don't process the logout attempt if another
    // logout is already in progress.
    if (logoutInterval) return;

    // show the initial nanite recall count
    const updateRecallCount = (curr, total) => {
      showAlert('warning', `<h4 class="alert-heading">Please Wait</h4>
        <hr>
        <p>Recalling and shutting down all deployed nanites.</p>
        <p><span id="recalled-nanites">${curr}</span> of 
        <span id="total-nanites">${total}</span> nanites have been recalled and powered off.</p>`);
    };

    // get a mock number of nanites that are deployed.
    const naniteCount = randInt(1000);
    updateRecallCount(0, naniteCount);

    const $recalled = $('#recalled-nanites');
    let curr = 0;

    // increments the # of nanites that have been recalled.
    const incrementCurrentCount = () => {
      curr += 1;
      $recalled.text(curr);
    };

    // increment the timeout counter
    logoutInterval = setInterval(function() {
      if (curr < naniteCount) {
        incrementCurrentCount();
      } else {
        clearInterval(logoutInterval);
        logoutInterval = null;

        // fade out the waning alert
        setTimeout(function() {
          $('#alert-container').removeClass('show');
        }, 500);

        // Indicate that all nanites have been recalled.
        setTimeout(function() {
          $('#alert-container').addClass('show');
          showAlert('success', `
            <h4 class="alert-heading">All Done!</h4>
            <p>All deployed nanites have been recalled and powered off.</p>
            <hr>
            <p>You are now being logged out.</p>
            `, 3500);

          // then process the actual logout
          setTimeout(function() {
            processLogout();
          }, 4000);
        }, 1000);
      }
    }, (5000 / naniteCount));
  });

});
