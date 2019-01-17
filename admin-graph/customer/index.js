const query = require('./query');
const mutation = require('./mutation');
const { usergqlSchema } = require('../../models/user');

module.exports = {
    customerTypeSchema: `
        ${usergqlSchema}
        input CustomerInput{
            name:String
            email:String
            password:String
        }
    `,
    customerSchema: { query: query.schema, mutation: mutation.schema },
    customerResolver: { ...query.resolver, ...mutation.resolver }
};