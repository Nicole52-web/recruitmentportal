const express = require('express');
const InterviewController = require('../Controller/InterviewController');
const {
    authenticateUser,
} = require("./../Middleware/UserAuthenticationMiddleware");
const {
    userAuthorizationHandler,
} = require("./../Middleware/UserAuthorizationMiddleware");
const router = express.Router();

router.post('/schedule', InterviewController.scheduleInterview, userAuthorizationHandler("user"));
router.put('/complete/:id', InterviewController.completeInterview,userAuthorizationHandler("recruiter"));
router.get('/allinterviews', userAuthorizationHandler("recruiter"), InterviewController.getInterviews);
router.get('/check', userAuthorizationHandler("recruiter"), InterviewController.checkInterview);
router.get('/statusinterviews', userAuthorizationHandler("user"), InterviewController.getStatusInterviews);

module.exports = router;