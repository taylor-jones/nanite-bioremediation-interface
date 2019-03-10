/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../app');


//
// Logout Route
//

describe('Test the /logout route', () => {
  test('It should respond with the GET method', () => {
    return request(app).get('/logout').then(response => {
      expect(response.statusCode).toBe(200);
    });
  });

  test('It should redirect to the Login page', () => {
    return request(app).get('/logout').then(response => {
      expect(response.text).toContain('<title>Login</title>');
    });
  });
});


//
// Logout Process
//

describe('Test the logout process', () => {
  test('It should destroy the user session', () => {
    return request(app).get('/logout').then(response => {
      expect(response).not.toHaveProperty('session');
    });
  });
});

