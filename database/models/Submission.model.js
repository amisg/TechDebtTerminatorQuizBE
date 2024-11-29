const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
	answers: [
		{
			questionId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Questions",
				required: true,
			},
			selectedOption: { type: String, required: true },
			score: { type: Number, required: true },
		},
	],
	totalScore: { type: Number, required: true },
	riskCategory: { type: String, required: true },
});

const SubmissionModel = mongoose.model("Submissions", SubmissionSchema);

module.exports = SubmissionModel;
