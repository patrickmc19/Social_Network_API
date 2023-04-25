const { Users } = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        Users.find({})
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(500).json(err);
            });
    },

    // get one user by id
    getUserId({ params }, res) {
        Users.findOne({ _id: params.id })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .then((userData) => {
                // If no user is found, send 404 error
                if (!userData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400).json(err);
            });
    },

    // create user
    createUser({ body }, res) {
        Users.create(body)
            .then((userData) => res.json(userData))
            .catch((err) => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(userData);
            })
            .catch((err) => res.json(err));
    },
};