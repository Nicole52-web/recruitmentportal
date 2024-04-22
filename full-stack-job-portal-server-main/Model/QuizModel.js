const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema(
    {
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        score:{
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Quiz', QuizSchema);