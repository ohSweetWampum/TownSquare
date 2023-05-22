const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

//GET all users and creat a user
router.route("/").get(getAllUsers).post(createUser);

// GET only a single user, PUT (update) a particular user, and DELETE a particular user's account
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// POST (create) a friend
router.route("/:userId/friends").post(addFriend);

//  DELETE a particular friend
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
