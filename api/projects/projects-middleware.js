// add middlewares here related to projects
const Projects = require("./projects-model");

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.now());
  next();
}

function validateId(req, res, next) {
  const { id } = req.params;
  Projects.get(id).then((possibleProject) => {
    if (possibleProject) {
      req.project = possibleProject;
      next();
    } else next({ message: "Project not found", status: 404 });
  });
}
function validatePost(req, res, next) {
  req.body.name && req.body.description ? next() : next({ status: 400 });
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateId, validatePost };
