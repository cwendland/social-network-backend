const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const Thought = require('../../models/Thought');
const User = require('../../models/User');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.get('/test', async (req,res) => {
    await User.find()
    .then((thoughts) => {
        console.log(thoughts);
        res.json(thoughts);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err)}
        );
});

module.exports = router;