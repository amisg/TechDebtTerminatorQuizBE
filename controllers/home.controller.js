const {
	getAllQuestions,
	getSubmissionById,
	saveSubmission,
	calculateRiskCategory,
	getAllRecommendations,
	sendEmail,
} = require("../services/home.service");

const { body, validationResult } = require("express-validator");

async function getQuestions(req, res) {
	try {
		const questions = await getAllQuestions();
		res.status(200).json(questions);
	} catch (error) {
		console.error("Error in getQuestions:", error.message);
		res.status(500).json({ error: "Failed to get questions" });
	}
}

async function submitQuiz(req, res) {
	const { answers } = req.body;
	// console.log("Received request body:", req.body);

	try {
		const totalScore = answers.reduce((acc, answer) => acc + answer.score, 0);

		const riskCategory = calculateRiskCategory(totalScore);

		const submission = await saveSubmission(answers, totalScore, riskCategory);

		res.status(201).json({
			submissionId: submission._id,
			totalScore,
			riskCategory,
		});
	} catch (error) {
		console.error("Error in submitQuiz:", error.message);
		res.status(500).json({ error: "Failed to process quiz submission" });
	}
}

async function fetchSubmission(req, res) {
	const { id } = req.params;

	try {
		const submission = await getSubmissionById(id);
		if (!submission) {
			return res.status(404).json({ error: "Submission not found" });
		}

		res.status(200).json(submission);
	} catch (error) {
		console.error("Error in fetchSubmission:", error.message);
		res.status(500).json({ error: "Failed to fetch submission" });
	}
}

async function getRecommendations(req, res) {
	try {
		const recommendations = await getAllRecommendations();
		res.status(200).json(recommendations);
	} catch (error) {
		console.error("Error in getRecommendations:", error.message);
		res.status(500).json({ error: "Failed to get recommendations" });
	}
}

const sendEmailHandler = [
	body("recipientEmail").isEmail().withMessage("Invalid email address"),
	body("results").notEmpty().withMessage("Results cannot be empty"),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const { recipientEmail, results, attachmentBase64 } = req.body;

			// Call the sendEmail function with the attachment
			const response = await sendEmail(
				recipientEmail,
				results,
				attachmentBase64
			);

			res.status(200).json(response);
		} catch (error) {
			console.error("Error in emailController:", error.message);
			res.status(500).json({ error: error.message });
		}
	},
];

module.exports = {
	getQuestions,
	submitQuiz,
	fetchSubmission,
	getRecommendations,
	sendEmailHandler,
};
