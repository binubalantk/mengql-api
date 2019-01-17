const query = require('./query');
const mutation = require('./mutation');
const { gqlSchema } = require('../../models/event');

module.exports = {
    eventTypeSchema: `
        ${gqlSchema}
        input EventInput{
            name:String
            price:Float
        }
    `,
    eventSchema: { query: query.schema, mutation: mutation.schema },
    eventResolver: { ...query.resolver, ...mutation.resolver }
};