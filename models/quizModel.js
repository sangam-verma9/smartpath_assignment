const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    questions: [
        {
            id: {
                type:String,
                required: [true,"Please enter question id"]
            },
            question: {
                type:String,
                required: [true,"Please enter question"]
            },
            options: [{
                type: String,
                required: [true,"Please enter question options"]
            }],
            correctAnswer: {
                type: String,
                required: [true,"Please enter correct answer"]
            }
        }
    ]
});
module.exports = mongoose.model("Quiz", quizSchema);