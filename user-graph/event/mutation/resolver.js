const { Event } = require('../../../models/event');
module.exports = {
    createEvent: async ({ eventInput }) => {
        const event = {
            name: eventInput.name,
            price: eventInput.price
        };
        const eventResponse = await new Event(event).save();
        return eventResponse;
    }
}; 