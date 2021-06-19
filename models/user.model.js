const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        numOfSpins: Number,
        numOfFactory: Number,
        numOfWoods: Number,
        numOfCustoms: Number,
        numOfInterchange: Number,
        numOfReserve: Number,
        numOfShoreline: Number,
        numOfLab: Number,
        favorites: [],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
            }
        ]
    })
);

module.exports = User;