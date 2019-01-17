const { Project } = require('../../../models/project');

module.exports = {
    projects: async (p, req) => {

        projects = await Project.find();
        return projects;
    },
    project: async ({ _id }) => {
        const event = await Project.findById(_id);
        return event;
    }
}