const graphqlHttp = require('express-graphql');
const passport = require('passport');
const rootSchema = require('./schema');
const rootResolver = require('./resolver');

const { authSchema, authResolver } = require('./auth');

const userGraph = {};
userGraph.init = function (app, config) {
    app.use(config.userContext.graphEnd,
        passport.authenticate('jwt', { session: false }),
        graphqlHttp({
            schema: rootSchema,
            rootValue: rootResolver,
            graphiql: config.userContext.enableGraphiql
        })
    );

    app.use(config.userContext.authEnd, graphqlHttp({
        schema: authSchema,
        rootValue: authResolver,
        graphiql: config.userContext.enableGraphiql
    }));
}
module.exports = userGraph;