const {connect, connection} = require('mongoose');

connect('mongodb://localhost/thoughtsAndResponses', {
    useNewUrlParse: true,
    useUnifiedTopology: true,
});

module.exports = connection;