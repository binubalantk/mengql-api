const resolver = require('./resolver');
const schema = require('./schema');
const { buildSchema } = require('graphql');

const { usergqlSchema } = require('../../models/user');

module.exports = {
    authSchema: buildSchema(`
        ${usergqlSchema}
        input AdminUserLoginInput{
            email:String!
            password:String!
        }
        type rootMutation{
            ${schema}
        }
        type rootQuery{
            dummy: String
        }
        type AuthToken{
            token:String!
            timestamp:String!
        }
        schema {
            query:rootQuery
            mutation:rootMutation
        }
    `),
    authResolver: { ...resolver }
};