
var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../server.js');


var Book = require('../model/Book');
var User = require('../model/User');
// var category = 'vacation-property';
var photos = 'http://images.com/example.png';
var agent = supertest(app);


//user model
const BookSchema = new Schema({
    name: String,
    category: String,
    photos: String,
    recording: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  });
  

describe('books', function () {
  after(function(done) {
    Book.remove({})
      .then(function () {
        User.remove({}, done);
      });
  });

  beforeEach(function(done) {
    Book.remove({})
      .then(function () {
        Book.remove({}, done);
      });
  });

  describe('GET /books', function () {
    it('list all bookss', function (done) {
      var book = new Book({ category, photos });

      var result = book.save();
      result.then(function () {
        agent
          .get('/books')
          .expect(function (response) {
            expect(response.text).to.contain(category);
            expect(response.text).to.contain(photos);
          })
          .expect(200, done);
        });
    });
  });

  describe('GET /books/new', function () {
    it('shows create book form', function (done) {
      agent
        .get('/books/new')
        .expect(function (response) {
          expect(response.text).to.contain('New');
        })
        .expect(200, done);
    });
  });

  describe('POST /books', function () {
    it('creates a book', function (done) {
      agent
        .post('/book')
        .type('form')
        .send({
          category,
          photos
        })
        .expect(function (response) {
          Book.findOne({}).then(function(book) {
            expect(book.photos).to.equal(photos);
          });
        })
        .expect(302, done);
    });
  });

  describe('GET /books/:id', function () {
    it('shows a single book ', function (done) {
      var book = new Book({ category, photos });

      var result = book.save();
      result.then(function () {
        agent
          .get('/books/' + book._id)
          .expect(function (response) {
            expect(response.text).to.contain(category);
            expect(response.text).to.contain(photos);
          })
          .expect(200, done);
        });
    });
  });

  describe('GET /books/:id/edit', function () {
    it('shows edit book form', function (done) {
      var book = new Book({ category, photos });

      var result = book.save();
      result.then(function () {
        agent
          .get('/books/' + book._id + '/edit')
          .expect(function (response) {
            expect(response.text).to.contain(category);
            expect(response.text).to.contain(photos);
          })
          .expect(200, done);
        });
    });
  });

  describe('POST /books/update', function () {
    it('update a book', function (done) {
      var updatedCategory = 'updated-category';
      new Book({ category, photos }).save()
        .then(function (savedBook) {
          agent
            .post('/books/update')
            .type('form')
            .send({
              bookId: savedBook.id,
              category: updatedCategory,
              photos
            })
            .expect(function (response) {
              Book.findOne({}).then(function(book) {
                expect(book.photos).to.equal(photos);
              });
            })
            .expect(302, done);
        });
    });
  });
});

var user = new User({
  email: 'me@example.com',
  username: 'bob',
  password: 's3cr3t'
});

var authenticateUser = function() {
  user.save()
  .then(function () {
    agent
    .post('/users/login')
    .type('form')
    .send({
      username: user.username,
      password: user.password
    })
  });
}