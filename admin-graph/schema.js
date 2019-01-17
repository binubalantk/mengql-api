const { buildSchema } = require('graphql');
const { customerTypeSchema, customerSchema } = require('./customer');


module.exports = buildSchema(`
    schema {
        query:rootQuery
        mutation:rootMutation
    }

    #input and type schemas
    ${customerTypeSchema}

    type rootQuery{
        ${customerSchema.query}
    }
    type rootMutation{
        ${customerSchema.mutation}
    }
`);