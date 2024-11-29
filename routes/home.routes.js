const express = require("express");
const {
	getQuestions,
	submitQuiz,
	fetchSubmission,
	getRecommendations,
	sendEmailHandler,
} = require("../controllers/home.controller");

const router = express.Router();

router.get("/getQuestions", getQuestions);

router.post("/submitQuiz", submitQuiz);

router.get("/results/:id", fetchSubmission);

router.get("/recommendations", getRecommendations);

router.post("/send-email", sendEmailHandler);

module.exports = router;
