const { User } = require('../../../models/user');
const bcrypt = require('bcrypt');
module.exports = {
    createCustomer: async ({ customerInput }) => {
        const user = {
            name: customerInput.name,
            email: customerInput.email,
            hashedPassword: bcrypt.hashSync(customerInput.password, 10),
            role: "customer"
        };

        const savedUser = await new User(user).save();
        delete savedUser.hashedPassword;

        return savedUser;
    }
}; 