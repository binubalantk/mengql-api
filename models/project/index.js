const mongoose = require('mongoose');
const gqlSchema = require('./schema');
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        require: true
    }
})
schema.post('save', function (err, doc, next) {
    if (err.name === 'MongoError' && err.code === 11000) {
        next(new Error("Project is already exists"));
    }
    else {
        next(err)
    }
});
module.exports.Project = mongoose.model('Project', schema);

module.exports.projectgqlSchema = gqlSchema;