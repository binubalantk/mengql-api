const { Project } = require('../../../models/project');
module.exports = {
    createProject: async ({ projectInput }, req) => {
        const project = {
            title: projectInput.title,
            description: projectInput.description,
            createdAt: (new Date()).toISOString(),
            user: req.user._id
        };
        const projectResponse = await new Project(project).save();
        return projectResponse;
    }
}; 