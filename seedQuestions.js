const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const QuestionModel = require("./database/models/Question.model");

const connectionString = process.env.MONGO_CONNECTION;

const questionsData = [
	{
		question: "When was the last time someone said 'it works on my machine'?",
		context:
			"Think about your development environment setup and onboarding experience.",
		warningSigns: [
			"Multiple setup steps in README",
			"Different versions of dependencies locally",
			"Environment-specific bugs",
			"Frequent configuration issues",
		],
		options: [
			{
				text: "Heard it today!",
				score: 0,
				impact: "High risk of production bugs, slow onboarding",
			},
			{
				text: "This week probably",
				score: 3,
				impact: "Occasional deployment issues, some confusion",
			},
			{
				text: "Maybe last month",
				score: 7,
				impact: "Minor inconsistencies, manageable",
			},
			{
				text: "Can't remember - our environments are consistent",
				score: 10,
				impact: "Smooth deployments, fast onboarding",
			},
		],
		category: "Development Environment",
	},
	{
		question: "How do your developers feel about Friday deployments?",
		context: "Consider your team's confidence in pushing code to production.",
		warningSigns: [
			"Deployment anxiety",
			"Regular rollbacks needed",
			"Weekend deployments common",
			"Manual deployment steps",
		],
		options: [
			{
				text: "We have a 'no Friday deploys' rule",
				score: 0,
				impact: "Release delays, weekend work common",
			},
			{
				text: "We deploy but keep fingers crossed",
				score: 3,
				impact: "High stress, occasional issues",
			},
			{
				text: "Comfortable with proper planning",
				score: 7,
				impact: "Manageable risk, good processes",
			},
			{
				text: "Deploy anytime with confidence",
				score: 10,
				impact: "Fully automated, reliable process",
			},
		],
		category: "Deployment Confidence",
	},
	{
		question:
			"How long would it take a new developer to understand your codebase?",
		context: "Consider your documentation and code clarity.",
		warningSigns: [
			"Missing or outdated documentation",
			"Heavy reliance on tribal knowledge",
			"Complex onboarding process",
			"Unclear architecture decisions",
		],
		options: [
			{
				text: "Months - mostly tribal knowledge",
				score: 0,
				impact: "High onboarding costs, knowledge silos",
			},
			{
				text: "Weeks - docs need updating",
				score: 3,
				impact: "Slow onboarding, some confusion",
			},
			{
				text: "Days - good docs, some gaps",
				score: 7,
				impact: "Efficient onboarding, minor issues",
			},
			{
				text: "Hours - comprehensive, up-to-date docs",
				score: 10,
				impact: "Rapid onboarding, clear understanding",
			},
		],
		category: "Code Documentation",
	},
	{
		question: "What happens when you need to fix a critical bug?",
		context: "Think about your testing and debugging processes.",
		warningSigns: [
			"No automated tests",
			"Frequent regressions",
			"Long debugging sessions",
			"Production fixes needed often",
		],
		options: [
			{
				text: "Prayer and overtime",
				score: 0,
				impact: "High risk, frequent issues",
			},
			{
				text: "Manual testing, some automation",
				score: 3,
				impact: "Slow fixes, moderate reliability",
			},
			{
				text: "Good test coverage, some gaps",
				score: 7,
				impact: "Quick fixes, rare issues",
			},
			{
				text: "Comprehensive automated testing",
				score: 10,
				impact: "Rapid, confident fixes",
			},
		],
		category: "Testing Practices",
	},
	{
		question: "How easy is it to add new features to your codebase?",
		context: "Consider your code maintainability and technical debt.",
		warningSigns: [
			"Frequent bugs from changes",
			"Long implementation times",
			"Fear of touching old code",
			"Tight coupling between components",
		],
		options: [
			{
				text: "Every change breaks something",
				score: 0,
				impact: "High maintenance cost, slow delivery",
			},
			{
				text: "Careful changes needed",
				score: 3,
				impact: "Moderate risk, cautious development",
			},
			{
				text: "Generally straightforward",
				score: 7,
				impact: "Good velocity, manageable risk",
			},
			{
				text: "Easy and confident",
				score: 10,
				impact: "Rapid development, high confidence",
			},
		],
		category: "Code Quality",
	},
	{
		question: "How often do dependency updates break your application?",
		context: "Think about your dependency management and update processes.",
		warningSigns: [
			"Multiple versions of the same library",
			"Security patches delayed",
			"Breaking changes frequent",
			"Update process not documented",
		],
		options: [
			{
				text: "Every update is a nightmare",
				score: 0,
				impact: "Security risks, version conflicts",
			},
			{
				text: "Major updates usually break things",
				score: 3,
				impact: "Delayed updates, technical debt accumulation",
			},
			{
				text: "Minor issues with major updates",
				score: 7,
				impact: "Manageable updates, good practices",
			},
			{
				text: "Updates are smooth and automated",
				score: 10,
				impact: "Current tech stack, minimal risks",
			},
		],
		category: "Technical Dependencies",
	},
	{
		question: "What happens during your traffic peaks?",
		context: "Consider your system's behavior under increased load.",
		warningSigns: [
			"System slowdowns common",
			"Manual scaling needed",
			"Resource limits unclear",
			"No performance testing",
		],
		options: [
			{
				text: "The system crashes regularly",
				score: 0,
				impact: "Lost business, poor user experience",
			},
			{
				text: "We add servers in panic",
				score: 3,
				impact: "Reactive scaling, inefficient resource use",
			},
			{
				text: "Some slowdown but manageable",
				score: 7,
				impact: "Good performance, manual intervention needed",
			},
			{
				text: "Auto-scales smoothly",
				score: 10,
				impact: "Optimal performance, cost-effective scaling",
			},
		],
		category: "Architecture Scalability",
	},
	{
		question: "How do you know if something's wrong with your application?",
		context: "Think about your monitoring and alerting systems.",
		warningSigns: [
			"Users report issues first",
			"No centralized logging",
			"Alert fatigue common",
			"Root cause analysis difficult",
		],
		options: [
			{
				text: "When users complain",
				score: 0,
				impact: "Poor user experience, reactive problem solving",
			},
			{
				text: "Basic monitoring, manual checks",
				score: 3,
				impact: "Delayed response, some issues missed",
			},
			{
				text: "Good monitoring, some blind spots",
				score: 7,
				impact: "Proactive detection, room for improvement",
			},
			{
				text: "Comprehensive monitoring and alerts",
				score: 10,
				impact: "Immediate detection, proactive resolution",
			},
		],
		category: "Monitoring and Observability",
	},
	{
		question: "How do you handle security updates and vulnerabilities?",
		context: "Consider your security practices and update processes.",
		warningSigns: [
			"No regular security audits",
			"Outdated dependencies",
			"Security patches delayed",
			"No vulnerability scanning",
		],
		options: [
			{
				text: "We update when something breaks",
				score: 0,
				impact: "High security risks, potential breaches",
			},
			{
				text: "Updates happen monthly if urgent",
				score: 3,
				impact: "Moderate risk, delayed protection",
			},
			{
				text: "Regular updates with some delays",
				score: 7,
				impact: "Good security, some exposure",
			},
			{
				text: "Automated security processes",
				score: 10,
				impact: "Strong security posture, minimal risk",
			},
		],
		category: "Security Practices",
	},
	{
		question: "How does your team handle technical debt?",
		context: "Consider your team's approach to code quality and maintenance.",
		warningSigns: [
			"We'll fix it later common",
			"No refactoring time",
			"Technical debt ignored",
			"Quick fixes preferred",
		],
		options: [
			{
				text: "What's technical debt?",
				score: 0,
				impact: "Accumulating problems, increasing costs",
			},
			{
				text: "We know it exists but ignore it",
				score: 3,
				impact: "Growing technical limitations",
			},
			{
				text: "Regular cleanup with backlog",
				score: 7,
				impact: "Managed debt, planned improvements",
			},
			{
				text: "Proactive management and prevention",
				score: 10,
				impact: "Sustainable development, high quality",
			},
		],
		category: "Development Culture",
	},
];

async function seedQuestions() {
	try {
		await mongoose.connect(connectionString);
		console.log("Connected to MongoDB");

		await QuestionModel.deleteMany({});
		console.log("Existing questions cleared");

		const insertedQuestions = await QuestionModel.insertMany(questionsData);
		console.log(`${insertedQuestions.length} questions inserted successfully`);

		await mongoose.connection.close();
		console.log("Database connection closed");
	} catch (error) {
		console.error("Error seeding database:", error);
		process.exit(1);
	}
}

seedQuestions();
