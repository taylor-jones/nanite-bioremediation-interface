
/* eslint-disable no-undef */

const request = require('supertest');
// const session = require('express-session');
const app = require('../app');

//
// Test User Settings
//


// User Settings
describe('Test the user settings path', () => {
  test('It should redirect to the login page when no user session exists', () => {
    return request(app).get('/settings').then(response => {
      expect(response.statusCode).toBe(302);
    });
  });

  // test('It should open the user settings page when a user session exists', () => {
  //   return request(app).get('/settings').then(response => {
  //     expect(response.statusCode).toBe(200);
  //   });
  // });
});
