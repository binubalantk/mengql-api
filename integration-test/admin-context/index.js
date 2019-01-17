const auth = require('./auth');
const customer = require('./customer');

module.exports = function(){
    describe('auth',auth);
    describe('customer',customer);
}