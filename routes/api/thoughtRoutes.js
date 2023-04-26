// require express router
const router = require("express").Router();

// require the functions from the thought controller
const {
    getAllThoughts,
    getThoughtId,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction,

} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router.route("/:id").get(getThoughtId).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(newReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;