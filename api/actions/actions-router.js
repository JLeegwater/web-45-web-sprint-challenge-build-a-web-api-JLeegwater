// Write your "actions" router here!
const express = require("express");
const {
  logger,
  validateId,
  validatePost,
} = require("./projects-middleware.js");
const Actions = require("./actions-model.js");

const router = express.Router();

router.get("/", logger, (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

module.exports = router;
