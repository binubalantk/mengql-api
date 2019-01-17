const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('mengql-api:index');

const config = require('./config');

//refine ObjectId.valueOf to support graphQL
mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
}

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { keepAlive: 1 });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

