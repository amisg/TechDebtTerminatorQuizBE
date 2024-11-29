const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	question: { type: String, required: true },
	context: { type: String, required: true },
	warningSigns: [{ type: String }],
	options: [
		{
			text: { type: String, required: true },
			score: { type: Number, required: true },
			impact: { type: String, required: true },
		},
	],
	category: { type: String, required: true },
});

const QuestionModel = mongoose.model("Questions", QuestionSchema);

module.exports = QuestionModel;
