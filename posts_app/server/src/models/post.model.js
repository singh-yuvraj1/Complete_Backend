const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        image_url: {
            type: String,
            required: true
        },

        image_public_id: {
            type: String
        },

        caption: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;