
const expect = require('chai').expect;
const supertest = require('supertest');

const app = require('../server.js');


const Book = require('../model/Book');
const User = require('../model/User');

const photos = 'http://images.com/example.png';
const agent = supertest(app);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//user model-this is ugly 
const BookSchema = new Schema({
  name: String,
  author: String,
  category: String,
  photos: String,
  recording: String,
  pageOne: String, 
  pageTwo: String, 
  pageThree: String, 
  pageFour: String, 
  pageFive: String, 
  imageOne: { type: String, default: '/public/moon.png' },
  imageTwo: { type: String, default: '/public/moon.png' }, 
  imageThree:{ type: String, default: '/public/moon.png' }, 
  imageFour: { type: String, default: '/public/moon.png' }, 
  imageFive: { type: String, default: '/public/moon.png' }, 
  imageMoon: { type: String, default: '/public/moon.png' },
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
//test index
  describe('GET /books', function () {
    it('list all books', function (done) {
      const book = new Book({ name, category, photos, author, category, photos, recording, pageOne, pageTwo, pageThree, pageFour, pageFive, pageSix, pageSeven, pageEight, pageNine, pageTen, pageEleven, pageTwelve, pageThirteen, pageFourteen, pageFifteen, pageSixteen, pageSeventeen, pageEighteen, pageNineteen, pageTwenty,pageTwentyOne, imageOne, imageTwo, imageThree, imageFour, imageFive, imageSix, imageSeven, imageEight, imageNine, imageTen, imageEleven, imageTwelve, imageThirteen, imageFourteen, imageFifteen, imageSixteen, imageSeventeen, imageEighteen, imageNineteen, imageTwenty, imageMoon  });
      //nothing is required in model so chose name
      const result = book.save();
      result.then(function () {
        agent
          .get('/books')
          .expect(function (response) {
            expect(response.text).to.contain(name);   
          })
          .expect(200, done);
        });
    });
  });
//book new
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
//create book
  describe('POST /books', function () {
    it('creates a book', function (done) {
      agent
        .post('/book')
        .type('form')
        .send({
          name
        })
        .expect(function (response) {
          Book.findOne({}).then(function(book) {
            expect(book.name).to.equal(name);
          });
        })
        .expect(302, done);
    });
  });
//show page
  describe('GET /books/:id', function () {
    it('shows a single book ', function (done) {
      const book = new Book({ name });

      const result = book.save();
      result.then(function () {
        agent
          .get('/books/' + book._id)
          .expect(function (response) {
            expect(response.text).to.contain(name);
          })
          .expect(200, done);
        });
    });
  });
//edit book
  describe('GET /books/:id/edit', function () {
    it('shows edit book form', function (done) {
      const book = new Book({ name });

      const result = book.save();
      result.then(function () {
        agent
          .get('/books/' + book._id + '/edit')
          .expect(function (response) {
            expect(response.text).to.contain(name);
          })
          .expect(200, done);
        });
    });
  });

  describe('POST /books/update', function () {
    it('update a book', function (done) {
      const updatedCategory = 'updated-category';
      new Book({ name }).save()
        .then(function (savedBook) {
          agent
            .post('/books/update')
            .type('form')
            .send({
              bookId: savedBook.id,
              name
            })
            .expect(function (response) {
              Book.findOne({}).then(function(book) {
                expect(book.name).to.equal(name);
              });
            })
            .expect(302, done);
        });
    });
  });
});
