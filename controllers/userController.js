// import ObectId type
const { ObjectId } = require("mongoose").Types;
//import models
const { User, Thought } = require("../models");
const mongoose = require("mongoose");
//function copunts the number of users on the app
const userCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((userCount) => userCount);
//function counts the number of friends a particular user has
const friendCount = async (userId) =>
  User.aggregate([
    { $match: { _id: ObjectId(userId) } },
    {
      $unwind: "$friends",
    },
    {
      $group: {
        _id: ObjectId(userId),
        totalFriends: { $sum: 1 },
      },
    },
  ]);

//userController
module.exports = {
  // Return all users along with the user count
  getAllUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObject = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObject);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Return a user by ID along with the friend count
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID!" })
          : res.json({
              user,
              friendCount: await friendCount(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user by ID
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user by ID and remove all thoughts associated with the user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists!" })
          : Thought.deleteMany({ username: user.username })
      )
      .then(() =>
        res.json({
          message:
            "User and their associated thoughts have been successfully deleted!",
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Add a friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: mongoose.Types.ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    )
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: mongoose.Types.ObjectId(req.params.friendId) } },
      { runValidators: true, new: true }
    )
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
