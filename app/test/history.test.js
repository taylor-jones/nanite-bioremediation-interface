/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../app');


describe('Test the user history path', () => {
  test('It should redirect to the login page when the user is not logged in', () => {
    return request(app).get('/history').then(response => {
      expect(response.statusCode).toBe(302);
    });
  });
});

// It should get only data for the logged in user

// It should get all data for the logged in user

