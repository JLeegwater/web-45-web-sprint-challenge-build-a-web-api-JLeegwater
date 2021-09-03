// Write your "actions" router here!
const express = require("express");
const { logger, validateId, validatePost } = require("./actions-middlware");
const Actions = require("./actions-model.js");

const router = express.Router();

router.get("/", logger, (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateId, (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.post("/", validatePost, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.put("/:id", validateId, validatePost, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => res.status(200).json(action))
    .catch(next);
});

router.delete("/:id", validateId, (req, res, next) =>
  Actions.remove(req.params.id).then(res.status(200)).catch(next)
);

module.exports = router;
