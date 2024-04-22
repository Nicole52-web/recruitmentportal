const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema(
    {
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Scheduled', 'Completed', 'Cancelled'],
            default: 'Scheduled',
        },
    },
    { timestamps: true }
);

const InterviewModel = mongoose.model("Interview", InterviewSchema);
module.exports = InterviewModel;