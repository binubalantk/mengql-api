const mutation = require('./mutation.test');
const query = require('./query.test');

module.exports = function(){
    describe('query',query);
    describe('mutation',mutation);
}