const { eventResolver } = require('./event');
const { projectResolver } = require('./project');

module.exports = {
    ...eventResolver,
    ...projectResolver
}