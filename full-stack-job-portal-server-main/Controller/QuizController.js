const QuizModel = require("../Model/QuizModel");


exports.saveQuiz = async (req, res) => {
    try {
        const {applicantId, score} = req.body;
        const newQuiz = new QuizModel({
            applicantId,
            score
        });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz Results saved successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};