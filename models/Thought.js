const {Schema, Types, model} = require('mongoose');
const formatDate = require('../utils/formatDate');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 128,
        //TODO validate between 1 and 128 chars
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => formatDate(date),
    },
    username: {
        type: String,
        ref: 'User',
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        getters: true,
    },
});

thoughtSchema.virtual('reactionCount').get(() => this.reactions.length);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;