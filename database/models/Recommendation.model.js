const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecommendationSchema = new Schema({
	riskCategory: { type: String, required: true, unique: true },
	summary: { type: String, required: true },
	detailedSummary: { type: String },
	immediateActions: {
		summary: { type: String },
		steps: [{ subHead: { type: String }, actions: [{ type: String }] }],
	},
	shortTermActions: {
		summary: { type: String },
		steps: [{ subHead: { type: String }, actions: [{ type: String }] }],
	},
	longTermActions: {
		summary: { type: String },
		steps: [{ subHead: { type: String }, actions: [{ type: String }] }],
	},
	resources: {
		team: [{ type: String }],
		tools: [{ type: String }],
		budgetConsiderations: [{ type: String }],
	},
	timeline: {
		steps: [{ type: String }],
	},
});

const RecommendationModel = mongoose.model(
	"Recommendations",
	RecommendationSchema
);

module.exports = RecommendationModel;
