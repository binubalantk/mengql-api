const mongoose = require('mongoose');
const gqlSchema = require('./schema');
const schema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
})
module.exports.Event = mongoose.model('Event', schema);

module.exports.gqlSchema = gqlSchema;