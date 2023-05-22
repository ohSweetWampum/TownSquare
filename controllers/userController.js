const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const userCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((userCount) => userCount);

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

module.exports = {
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

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

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

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with this ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
