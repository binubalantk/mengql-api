const graphqlHttp = require('express-graphql');
const passport = require('passport');
const rootSchema = require('./schema');
const rootResolver = require('./resolver');

const { authSchema, authResolver } = require('./auth');

const userGraph = {};
userGraph.init = function (app, config) {
    app.use(config.adminContext.graphEnd, 
        passport.authenticate('jwt', { session: false }),
        graphqlHttp({
            schema: rootSchema,
            rootValue: rootResolver,
            graphiql: config.adminContext.enableGraphiql
        })
    );

    app.use(config.adminContext.authEnd, graphqlHttp({
        schema: authSchema,
        rootValue: authResolver,
        graphiql: config.adminContext.enableGraphiql
    }));
}
module.exports = userGraph;