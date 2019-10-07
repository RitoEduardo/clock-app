const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let modelSchema = new Schema({
    date_user: {
        type: Date,
        required: true
    },
    date_generate: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('MODEL', modelSchema);