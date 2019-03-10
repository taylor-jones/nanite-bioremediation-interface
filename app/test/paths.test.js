/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../app');

//
// Test Page Navigation
//

// Root
describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);
    });
  });
});


// Bogus Route
describe('Test a non-existing path', () => {
  test('It should respond with 404', () => {
    return request(app).get('/bogus').then(response => {
      expect(response.statusCode).toBe(404);
    });
  });
});
