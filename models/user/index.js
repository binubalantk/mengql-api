const mongoose = require('mongoose');
const gqlSchema = require('./schema');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    hashedPassword: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        default:"customer"
    }
})
schema.post('save', function (err, doc, next) {
    if (err.name === 'MongoError' && err.code === 11000) {
        next(new Error("Your account already exists with this email"));
    }
    else {
        next(err)
    }
});
module.exports.User = mongoose.model('User', schema);

module.exports.usergqlSchema = gqlSchema;