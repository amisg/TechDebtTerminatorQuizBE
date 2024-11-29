const { default: mongoose } = require("mongoose");
const QuestionModel = require("../database/models/Question.model");
const RecommendationModel = require("../database/models/Recommendation.model");
const SubmissionModel = require("../database/models/Submission.model");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

async function getAllQuestions() {
	try {
		return await QuestionModel.find();
	} catch (error) {
		throw new Error("Error fetching questions");
	}
}

function calculateRiskCategory(totalScore) {
	const averageScore = totalScore / 10;
	if (averageScore >= 0 && averageScore <= 3) return "Critical Risk";
	if (averageScore > 3 && averageScore <= 5) return "High Risk";
	if (averageScore > 5 && averageScore <= 7) return "Moderate Risk";
	if (averageScore > 7 && averageScore <= 10) return "Low Risk";
	return "Unknown Risk";
}

async function saveSubmission(answers, totalScore, riskCategory) {
	try {
		answers.forEach((answer) => {
			if (!mongoose.Types.ObjectId.isValid(answer.questionId)) {
				throw new Error(`Invalid questionId: ${answer.questionId}`);
			}
		});

		const submission = new SubmissionModel({
			answers,
			totalScore,
			riskCategory,
		});

		return await submission.save();
	} catch (error) {
		console.error("Error saving submission:", error.message);
		throw new Error("Error saving submission");
	}
}

async function getSubmissionById(submissionId) {
	try {
		return await SubmissionModel.findById(submissionId).populate(
			"answers.questionId"
		);
	} catch (error) {
		throw new Error("Error fetching submission: " + error.message);
	}
}

async function getAllRecommendations() {
	try {
		return await RecommendationModel.find({});
	} catch (error) {
		throw new Error("Error fetching recommandations");
	}
}

const sendEmail = async (recipientEmail, results, attachmentBase64) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		secure: false, // Use TLS
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false, // Allow self-signed certificates
		},
	});

	// console.log("Attachment Base64 Length:", attachmentBase64?.length);

	// Configure email content
	const mailOptions = {
		from: {
			name: "TechDebtTerminatorQuiz",
			address: process.env.EMAIL_USER,
		},
		to: recipientEmail,
		subject: "Quiz Results",
		html: `
        <h1>Your Quiz Results</h1>
        <p>${results}</p>
      `,
		attachments: attachmentBase64
			? [
					{
						filename: "Quiz_Report.pdf", // Name of the attached file
						content: attachmentBase64, // Base64-encoded content
						encoding: "base64", // Specify Base64 encoding
					},
			  ]
			: [],
	};

	try {
		// console.log("Mail Options:", mailOptions);

		await transporter.sendMail(mailOptions);
		return {
			success: true,
			message: "Email sent successfully with attachment!",
		};
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error("Failed to send email.");
	}
};

module.exports = {
	getAllQuestions,
	calculateRiskCategory,
	saveSubmission,
	getSubmissionById,
	getAllRecommendations,
	sendEmail,
};
