const Thought = require('../models/Thought');

module.exports = {
  async getThoughts(req, res) {
    await Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
          .select('-__v')
          .then((thought) => 
            !thought
              ? res.status(404).json({message: 'No thought with that ID.'})
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.status(500).json(err));
    },
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    deleteThought(req,res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
          .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
          )
          .then(() => res.json({message: 'Thought deleted!'}))
          .catch((err) => res.status(500).json(err));
    },
    addResponse(req,res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {responses: req.body}},
            {runValidators: true, new: true}
        )
          .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    removeResponse(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { responses: { _id: req.params.responseId } } },
            { runValidators: true, new: true }
            )
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};