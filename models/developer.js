const mongoose = require('mongoose');

let developerSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name:{
        firstName: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        }
    },
    level : {
        type: String,
        validate:{
            validator: function (levelVal) {
                return levelVal === "Expert" || levelVal === "Beginner";
            }
        },
        required: true
    },
    address:{
        suburb: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Developer', developerSchema);