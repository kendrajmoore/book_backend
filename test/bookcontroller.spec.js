const expect = require('chai').expect;

const { create } = require('../controllers/books');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('Create Route', function() {
    describe('Make books function', function() {
        it('Should error out if no name provided ', function() {
            create(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });

        it('Should send moon pic default', function() {
            let newReq = req;
            newReq.body.name = '/public/moon.png';
            
            create(newReq, res);
            expect(res.sendCalledWith).to.equal('/public/moon.png');
        });

    

        it('Should return a book', function() {
            let newReq = req;
            newReq.body.name = 'Fake Title';

        
            create(newReq, res);
            expect(res.sendCalledWith).to.equal('Fake Title');

        });
    })
});