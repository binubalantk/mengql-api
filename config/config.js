const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  ADMIN_DEPLOY: Joi.boolean()
    .default(false),
  USER_GRAPH_ENDPOINT: Joi.string().required()
    .description('User graph api endpoint url'),
  USER_AUTH_ENDPOINT: Joi.string().required()
    .description('User auth api endpoint url'),
  USER_ENABLE_GRAPHIQL: Joi.boolean().required().default(false),
  ADMIN_GRAPH_ENDPOINT: Joi.string()
    .description('Admin graph api endpoint url'),
  ADMIN_AUTH_ENDPOINT: Joi.string()
    .description('Admin auth api endpoint url'),
  ADMIN_ENABLE_GRAPHIQL: Joi.boolean().required().default(false)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  frontend: envVars.MEAN_FRONTEND || 'angular',
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  userContext: {
    graphEnd: envVars.USER_GRAPH_ENDPOINT,
    authEnd: envVars.USER_AUTH_ENDPOINT,
    enableGraphiql: envVars.USER_ENABLE_GRAPHIQL
  },
  adminContext: {
    hasContext: envVars.ADMIN_DEPLOY,
    graphEnd: envVars.ADMIN_GRAPH_ENDPOINT,
    authEnd: envVars.ADMIN_AUTH_ENDPOINT,
    enableGraphiql: envVars.ADMIN_ENABLE_GRAPHIQL
  }
};

module.exports = config;