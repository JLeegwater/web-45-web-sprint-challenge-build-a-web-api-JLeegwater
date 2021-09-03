const Actions = require("./actions-model");

function logger(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(Date.now());
  next();
}

async function validateId(req, res, next) {
  const { id } = req.params;
  await Actions.get(id)
    .then((possibleAction) => {
      if (possibleAction) {
        req.action = possibleAction;
        next();
      } else next({ message: "Action not found", status: 404 });
    })
    .catch(next);
}
function validatePost(req, res, next) {
  req.body.project_id &&
  req.body.description &&
  req.body.notes &&
  req.body.completed != null
    ? next()
    : next({ status: 400 });
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateId, validatePost };
