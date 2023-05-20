const router = require("express").Router();

const {
  getEveryUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  unfriend,
} = require("../../controllers/user-controller");

router.route("/").get(getEveryUser).post(createUser);

// Set up GET only one, PUT, and DELETE for users accounts
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// set up POST and DELETE to friend and unfriend
router.route("/:userId/friends/:friendId").post(addNewFriend).delete(unfriend);

module.exports = router;
