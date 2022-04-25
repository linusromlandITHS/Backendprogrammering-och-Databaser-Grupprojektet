const mongoose = require('mongoose');

const Sea = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    sizeInSquareKm: {
        type: Number,
        required: true,
    },
    averageDepthInMeters: {
        type: Number,
        required: true,
    },
    species: {
        type: Array,
        required: true,
    },
});

module.exports = Sea;