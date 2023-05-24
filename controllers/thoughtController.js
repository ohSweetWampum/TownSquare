// Import the models
const { Thought, User } = require("../models");
// Controller for thoughts
const thoughtsController = {
  // Return all thoughts in the database
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Find a specific thought by ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought and add it to a user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought by ID and remove it from the associated user
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Create a new reaction for a thought by it's ID
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction by ID from a thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};
//export all this to the thoughtsController
module.exports = thoughtsController;
