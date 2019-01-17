const { buildSchema } = require('graphql');
const { eventTypeSchema, eventSchema } = require('./event');
const { projectTypeSchema, projectSchema } = require('./project');

module.exports = buildSchema(`
    schema {
        query:rootQuery
        mutation:rootMutation
    }

    #input and type schemas
    ${eventTypeSchema}
    ${projectTypeSchema}

    type rootQuery{
        ${eventSchema.query}
        ${projectSchema.query}
    }
    type rootMutation{
        ${eventSchema.mutation}
        ${projectSchema.mutation}
    }
`);