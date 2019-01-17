const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
module.exports = {
    signup: async ({ userInput }) => {
        const user = {
            name: userInput.name,
            email: userInput.email,
            hashedPassword: bcrypt.hashSync(userInput.password, 10),
            role: "customer"
        };

        const savedUser = await new User(user).save();
        delete savedUser.hashedPassword;

        const timestamp = (new Date()).toISOString();
        savedUser.timestamp = timestamp;

        const tokenPayload = JSON.stringify(savedUser);
        const token = jwt.sign(tokenPayload, config.jwtSecret);
        return { token, timestamp };
    },
    login: async ({ userInput }) => {
        let user = await User.findOne({ email: userInput.email });
        if (!user || !bcrypt.compareSync(userInput.password, user.hashedPassword)) {
            return (new Error("Login failed"));
        }

        user = user.toObject();
        delete user.hashedPassword;

        const timestamp = (new Date()).toISOString();
        user.timestamp = timestamp;

        const tokenPayload = JSON.stringify(user);
        const token = jwt.sign(tokenPayload, config.jwtSecret);

        return { token, timestamp };
    }
};