/* eslint-disable no-undef, camelcase */

const request = require('supertest');
const app = require('../app');

//
// Test Login
//


// Route
describe('Test the /login route', () => {
  test('It should response the GET method', () => {
    return request(app).get('/login').then(response => {
      expect(response.statusCode).toBe(200);
    });
  });
});


// Login Process
describe('Test login authentication', () => {
  const badCredentials = { user_name: 'bob', user_password: 'saget' };
  const goodCredentials = { user_name: 'michaelscott', user_password: '#1boss' };

  test('It should reject invalid user credentials', () => {
    return request(app)
      .post('/login')
      .send(badCredentials)
      .then(response => {
        expect(response.text).toContain('Login unsuccessful');
        expect(response.text).not.toContain('Login successful');
      });
  });

  test('It should accept valid user credentials', () => {
    return request(app)
      .post('/login')
      .send(goodCredentials)
      .then(response => {
        expect(response.text).not.toContain('Login unsuccessful');
      });
  });

  test('It should create a session', () => {
    return request(app)
      .post('/login')
      .send(goodCredentials)
      .then(response => {
        expect(request.session).not.toBe(null);
        expect(response.session).not.toBe(null);
      });
  });
});
