const { User } = require('../../../models/user');

module.exports = {
    customers: async (arg, req) => {
        const customers = await User.find({role:"customer"});
        return customers;
    },
    customer: async ({ _id }) => {
        const customer = await User.findById(_id);
        return customer;
    }
}