const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true,"Please enter a category"]
    },
    chapters: [
        {
            id: {
                type: String,
                required: [true,"Please enter chapter id"]
            },
            title: {
                type: String,
                required: [true,"Please enter title for chapter"]
            },
            content: {
                type: String,
                required: [true,"Please enter content for chapter"]
            },
            description: {
                type: String,
                required: [true,"Please enter description for chapter"]
            },
            videoLink: {
                type: String,
                required: [true,"Please enter video link for chapter"]
            },
            duration: {
                type: Number,
                required: [true,"Please enter duration for chapter"]
            },
        }
    ],
    description: {
        type: String,
        required: [true,"Please enter description of course"]
    },
    duration: {
        type: Number,
        required: [true,"Please enter duration of course"]
    },
    instructorName: {
        type: String,
        required: [true,"Please enter instructor name for course"]
    },
    language: {
        type: String,
        required: [true,"Please enter laguage of course"]
    },
    level: {
        type: String,
        default: 'easy'
    },
    price: {
        type: Number,
        required: [true,"Please enter price of course"]
    },
    status: {
        type: String,
        default:'published'
    },
    visibility: {
        type: String,
        default:'Public'
    }
});
module.exports = mongoose.model("Course", courseSchema);