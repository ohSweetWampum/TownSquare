const router = require("express").Router();

const {
  getEveryThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Set up GET all ands
router.route("/").get(getEveryThought).post(createThought);

// Set up GET one, PUT, and DELETE for thoughts
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Set up POST and DELETE for making and deleteing reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
