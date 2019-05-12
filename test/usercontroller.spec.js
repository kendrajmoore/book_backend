const expect = require('chai').expect;

const { create } = require('../controllers/users');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('Create Account', function() {
    describe('Make an account', function() {
        it('Should error out if no password provided ', function() {
            create(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });

        it('Should error out if no email provided ', function() {
            create(req, res);
            expect(res.sendCalledWith).to.contain('error');
        });

    })
});