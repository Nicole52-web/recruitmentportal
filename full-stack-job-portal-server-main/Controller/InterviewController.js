const InterviewModel = require("../Model/InterviewModel");
const ApplicationModel = require("../Model/ApplicationModel");

const InterviewController = {
    scheduleInterview: async (req, res) => {
        const { applicantId, recruiterId, jobId, date, time } = req.body;

        try {
            const interview = new InterviewModel({
                applicantId,
                recruiterId,
                jobId,
                date,
                time,
            });

            await interview.save();

            res.status(201).json({ message: "Interview scheduled successfully", interview });
        } catch (error) {
            res.status(500).json({ message: "Error scheduling interview", error });
        }
    },

    getInterviews: async (req,res,next) => {
        try {
            const recruiterId = req.user._id;
            const interviews = await InterviewModel.find({ recruiterId }).populate('applicantId').populate('jobId');

            res.status(200).json({ 
                success: true,
                interviews, 
            });
        }catch (error) {
            next(error);
    }
    },

    getStatusInterviews: async (req,res,next) => {
        try {
            const applicantId = req.user._id;
            const interviews = await InterviewModel.find({ applicantId }).populate('jobId');

            res.status(200).json({ 
                success: true,
                interviews, 
            });
        }catch (error) {
            next(error);
    }
    },
    
    checkInterview: async (req, res) => {
        const { applicantId, jobId } = req.query;
    
        try {
            const interview = await InterviewModel.findOne({ applicantId, jobId });
    
            res.status(200).json({ exists: !!interview });
        } catch (error) {
            res.status(500).json({ message: "Error checking interview", error });
        }
    },


    completeInterview: async (req, res) => {
        const interviewId  = req.params.id;

        try {
            const interview = await InterviewModel.findById(interviewId);

            if (!interview) {
                return res.status(404).json({ message: "Interview not found" });
            }

            interview.status = 'Completed';
            await interview.save();

            const application = await ApplicationModel.findOne({ jobId: interview.jobId, applicantId: interview.applicantId });

            if (application) {
                application.status = 'Completed';
                await application.save();
            }

            res.status(200).json({ message: "Interview and application status updated successfully", interview, application });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error updating interview status", error });
        }
    },
};

module.exports = InterviewController;