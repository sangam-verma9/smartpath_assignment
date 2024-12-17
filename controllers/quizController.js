const Quiz = require("../models/quizModel");

//create a new Quiz for a course
exports.createquiz = async (req, res) => {
    try {
        const quiz = new Quiz({ ...req.body, courseId: req.params.courseId });
        await quiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        res.status(400).send(err);
    }
}

//get all quizzes for a course
exports.getquizzes = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const quizzes = await Quiz.find({ courseId: req.params.courseId })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(quizzes);
    } catch (err) {
        res.status(500).send(err);
    }
}

// get a quiz by id
exports.getquizbyid = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).send('Quiz not found');
        res.json(quiz);
    } catch (err) {
        res.status(500).send(err);
    }
}

// update a quiz 
exports.updatequiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!quiz) return res.status(404).send('Quiz not found');
        res.json(quiz);
    } catch (err) {
        res.status(400).send(err);
    }
}

// delere a quiz
exports.deletequiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).send('Quiz not found');
        res.json(quiz);
    } catch (err) {
        res.status(500).send(err);
    }
}

//quiz taking fn and evaluate score
exports.takequiz = async (req, res)=>{
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).send('Quiz not found');

        const { answers } = req.body;
        let score = 0;
        quiz.questions.forEach(question => {
            const userAnswer = answers[question.id];
            if (userAnswer === question.correctAnswer) {
                score++;
            }
        });

        res.send({ score, total: quiz.questions.length });
    } catch (err) {
        res.status(500).send(err);
    }
}