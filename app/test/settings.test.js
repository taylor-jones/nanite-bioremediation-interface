/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../app');


// User Settings
describe('Test the user settings path', () => {
  test('It should redirect to the login page when no user session exists', () => {
    return request(app).get('/settings').then(response => {
      expect(response.statusCode).toBe(302);
    });
  });


  // it should open the user settings page when a user session does exist.

  // it should update the settings data in settings.json
  // whenever a user makes a change to the settings page
});
