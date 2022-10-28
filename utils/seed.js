const connection = require("../config/connection");
const {User, Thought} = require('../models');

connection.on("error", (err) => err);

connection.once('open', async () => {
    console.log('Connected to db');

    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);
})