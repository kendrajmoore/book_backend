const expect = require('chai').expect;
const supertest = require('supertest');

const app = require('../server.js');
//require models
const Book = require('../model/Book');
const User = require('../model/User');
const Video = require('../model/Video');


//video model
const VideoSchema = new Schema({
    name: String,
    url: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  });


describe('video', function () {
    after(function(done) {
      Video.remove({})
        .then(function () {
          User.remove({}, done);
        });
    });
  
    beforeEach(function(done) {
      Video.remove({})
        .then(function () {
          Video.remove({}, done);
        });
    });
  
    describe('GET /video', function () {
      it('list all video', function (done) {
        const video = new Video({ data });
  
        const result = video.save();
        result.then(function () {
          agent
            .get('/video')
            .expect(function (response) {
              expect(response).to.contain(data);
            })
            .expect(200, done);
          });
      });
    });

