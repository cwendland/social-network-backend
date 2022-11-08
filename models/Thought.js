const {Schema, Types, model} = require('mongoose');
const moment = require('moment');

const responseSchema = new Schema(
    {
        responseId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        responseBody: {
            type: String,
            max_length: 280,
        },
        username: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return moment(date).format("MMM DD, YYYY [at] hh:mma");
            },
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 128,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            return moment(date).format("MMM DD, YYYY [at] hh:mma");
        },
    },
    username: {
        type: String,
        required: true,
    },
    responses: [responseSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
});

//thoughtSchema.virtual('responseCount').get(() => this.responses.length);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;