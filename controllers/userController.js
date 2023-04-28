const { User } = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            // .populate({
            //     path: "friends",
            //     select: "-__v",
            // })
            .select("-__v")
            .then((userData) => res.json(userData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(500).json(err);
            });
    },

    // get one user by id
    getUserId({ params }, res) {
        User.findOne({ _id: params.id })
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
        User.create(body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(userData);
            })
            .catch((err) => res.json(err));
    },

    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(userData);
            })
            .catch((err) => res.json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with this id!" });
                    return;
                }
                res.json(userData);
            })
            .catch((err) => res.json(err));
    },

    // remove friend
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .populate({
            path: "friends",
            select: "-__v",
        })
        .select("-__v")
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

// export this controller module
module.exports = userController;