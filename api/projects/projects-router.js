// Write your "projects" router here!
const express = require("express");
const {
  logger,
  validateId,
  validatePost,
} = require("./projects-middleware.js");
const Projects = require("./projects-model.js");

const router = express.Router();

router.get("/", logger, (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", validateId, (req, res) => {
  res.json(req.project);
});

router.post("/", validatePost, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put("/:id", validateId, validatePost, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((project) => res.status(200).json(project))
    .catch(next);
});

router.delete("/:id", validateId, (req, res, next) =>
  Projects.remove(req.params.id)
    .then(() => res.status(200))
    .catch(next)
);

router.get("/:id/actions", validateId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  // we plug it AFTER the endpoints
  console.log(err.message);
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something bad inside the Projects router!",
  });
});

module.exports = router;
