const query = require('./query');
const mutation = require('./mutation');
const { projectgqlSchema } = require('../../models/project');
const { usergqlSchema } = require('../../models/user');

module.exports = {
    projectTypeSchema: `
        ${usergqlSchema}
        ${projectgqlSchema}
        input ProjectInput{
            title:String
            description:String
        }
    `,
    projectSchema: {
        query: query.schema,
        mutation: mutation.schema
    },
    projectResolver: {
        ...query.resolver,
        ...mutation.resolver
    }
};