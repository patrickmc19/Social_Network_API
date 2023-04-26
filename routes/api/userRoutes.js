// require express router
const router = require("express").Router();

// require the functions from the user controller
const {
    getAllUsers,
    getUserId,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,

} = require("../../controllers/userController");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getUserId).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;