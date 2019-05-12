const expect = require('chai').expect
  , supertest = require('supertest')
  , mongoose = require('mongoose')
  , app = require('../server')

const agent = supertest(app);
const Schema = mongoose.Schema;

describe('users', function () {
  describe('GET /users/new', function () {
    it('shows registration form', function (done) {
      agent
        .get('/users/new')
        .expect(function (res) {
        })
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          expect(res.text).to.contain('Sign up');
          done();
        });
    });
  });

  describe('POST /users', function () {
    it('register a new user', function (done) {
      agent
        .post('/users')
        .send({
          username: 'bob',
          email: 'bob@example.com',
          password: 's3cr3t'
        })
        .expect(302)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          done();
        });
    });
  });
});