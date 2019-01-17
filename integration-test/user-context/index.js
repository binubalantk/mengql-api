const auth = require('./auth');
const project = require('./project');

module.exports = function(){
    describe('auth',auth);
    describe('project',project);
}