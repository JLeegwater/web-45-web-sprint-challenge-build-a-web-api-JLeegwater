const Projects = require("./projects-model");

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.now());
  next();
}

async function validateId(req, res, next) {
  const { id } = req.params;
  await Projects.get(id)
    .then((possibleProject) => {
      if (possibleProject) {
        req.project = possibleProject;
        next();
      } else next({ message: "Project not found", status: 404 });
    })
    .catch(next);
}
function validatePost(req, res, next) {
  req.body.name && req.body.description && req.body.completed != null
    ? next()
    : next({ status: 400 });
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateId, validatePost };
