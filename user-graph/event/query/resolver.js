const { Event } = require('../../../models/event');

module.exports = {
    events: async (p, req) => {
        const events = await Event.find();
        console.log(req.user);
        return events;
    },
    event: async ({ _id }) => {
        const event = await Event.findById(_id);
        return event;
    }
}