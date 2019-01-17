const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
module.exports = {
    login: async ({ userInput }) => {
        let user = await User.findOne({ email: userInput.email, role: "admin" });
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