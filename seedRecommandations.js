const mongoose = require("mongoose");

const dotenv = require("dotenv");
const RecommendationModel = require("./database/models/Recommendation.model");
dotenv.config();

const connectionString = process.env.MONGO_CONNECTION;

const recommendationsData = [
	{
		riskCategory: "Critical Risk",
		summary: "Code Red - Immediate Action Required",
		detailedSummary: `Your system is at a critical juncture where technical debt is actively hindering business operations and team productivity. This situation requires immediate attention and decisive action to prevent potential system failures and maintain business continuity.`,
		immediateActions: {
			summary: "Immediate Actions (First 30 Days)",
			steps: [
				{
					subHead: "Establish a Technical Debt Command Center",
					actions: [
						"Designate a senior technical lead to oversee debt reduction",
						"Create a daily standup focused solely on critical issues",
						"Set up emergency response protocols for system failures",
						"Document all known issues in a centralized location",
					],
				},
				{
					subHead: "Critical System Stabilization",
					actions: [
						"Implement automated monitoring for critical paths",
						"Set up basic automated testing for core functionality",
						"Create backup and recovery procedures",
						"Establish a feature freeze for non-critical updates",
					],
				},
				{
					subHead: "Resource Allocation",
					actions: [
						"Dedicate at least 40% of development time to debt reduction",
						"Form a 'SWAT team' for critical issue resolution",
						"Consider bringing in external experts for specialized areas",
						"Allocate emergency budget for critical tools and resources",
					],
				},
			],
		},
		shortTermActions: {
			summary: "90-Day Action Plan",
			steps: [
				{
					subHead: "Infrastructure and Monitoring",
					actions: [
						"Implement comprehensive logging",
						"Set up automated alerting for key metrics",
						"Create performance baselines",
						"Establish uptime monitoring",
					],
				},
				{
					subHead: "Code Quality Initiatives",
					actions: [
						"Begin code review process implementation",
						"Set up automated code quality checks",
						"Start documenting critical system components",
						"Implement basic CI/CD pipeline",
					],
				},
				{
					subHead: "Team and Process",
					actions: [
						"Conduct emergency technical training sessions",
						"Establish clear coding standards",
						"Create incident response procedures",
						"Begin technical documentation efforts",
					],
				},
			],
		},
		longTermActions: {
			summary: "6-Month Objectives",
			steps: [
				{
					subHead: "Achieve basic system stability",
					actions: [
						"Implement fundamental monitoring",
						"Establish core development processes",
						"Create preliminary technical documentation",
						"Reach 30% automated test coverage for critical paths",
					],
				},
				// {
				// 	subHead: "",
				// 	actions: [],
				// },
			],
		},
		resources: {
			team: [
				"1 Senior Technical Lead",
				"2-3 Senior Developers",
				"1 DevOps Engineer",
				"1 QA Engineer",
			],
			tools: [
				"Monitoring tools",
				"CI/CD platform",
				"Code quality tools",
				"Testing framework",
			],
			budgetConsiderations: [
				"Emergency technical debt fund",
				"Training and documentation resources",
				"External consultation when needed",
				"Infrastructure upgrades",
			],
		},
		timeline: {},
	},
	{
		riskCategory: "High Risk",
		summary: "Urgent Improvement Needed",
		detailedSummary:
			"While your system isn't in immediate danger of collapse, significant technical debt is hampering productivity and increasing operational risks. A structured approach to debt reduction is needed while maintaining business operations.",
		immediateActions: {
			summary: "90-Day Priority Actions",
			steps: [
				{
					subHead: "Development Processes",
					actions: [
						"Implement standardized code review process",
						"Set up automated quality gates",
						"Create technical documentation templates",
						"Establish regular refactoring sessions",
					],
				},
				{
					subHead: "Testing and Quality",
					actions: [
						"Develop automated testing strategy",
						"Implement continuous integration",
						"Set up regular security scans",
						"Create performance testing framework",
					],
				},
				{
					subHead: "Team Organization",
					actions: [
						"Assign technical debt champions",
						"Create specialized task forces",
						"Implement pair programming",
						"Establish knowledge sharing sessions",
					],
				},
			],
		},
		shortTermActions: {
			summary: "6-Month Improvement Plan",
			steps: [
				{
					subHead: "Architecture and Code",
					actions: [
						"Begin systematic refactoring",
						"Implement service boundaries",
						"Improve error handling",
						"Enhance logging and monitoring",
					],
				},
				{
					subHead: "Process Improvements",
					actions: [
						"Standardize deployment processes",
						"Implement feature flags",
						"Create technical debt tracking system",
						"Establish metrics for code quality",
					],
				},
				{
					subHead: "Knowledge Management",
					actions: [
						"Create architecture documentation",
						"Implement wiki for technical guides",
						"Record architectural decisions",
						"Develop onboarding materials",
					],
				},
			],
		},
		longTermActions: {},
		resources: {
			team: [
				"Technical Debt Coordinator",
				"Quality Assurance Lead",
				"Development Team Leads",
				"DevOps Engineer",
			],
			tools: [
				"Code quality platforms",
				"Testing frameworks",
				"Documentation tools",
				"Monitoring solutions",
			],
			budgetConsiderations: [],
		},
		timeline: {},
	},
	{
		riskCategory: "Moderate Risk",
		summary: "Steady Improvement Needed",
		detailedSummary:
			"Your system has a manageable level of technical debt but requires consistent attention to prevent deterioration and improve overall quality. Focus on systematic improvements while maintaining development velocity.",
		immediateActions: {
			summary: "Optimization Strategy",
			steps: [
				{
					subHead: "Code Quality Enhancement",
					actions: [
						"Regular code reviews",
						"Automated style checking",
						"Technical debt tracking",
						"Systematic refactoring",
					],
				},
				{
					subHead: "Process Refinement",
					actions: [
						"Sprint technical debt allocation",
						"Documentation updates",
						"Testing strategy improvements",
						"Performance optimization",
					],
				},
				{
					subHead: "Architecture Evolution",
					actions: [
						"Service boundary definition",
						"Interface standardization",
						"Scalability planning",
						"Security hardening",
					],
				},
			],
		},
		shortTermActions: {
			summary: "Best Practices Implementation",
			steps: [
				{
					subHead: "Development Workflow",
					actions: [
						"Feature flag strategy",
						"Branch management",
						"Code review guidelines",
						"Testing requirements",
					],
				},
				{
					subHead: "Quality Assurance",
					actions: [
						"Test coverage goals",
						"Performance benchmarks",
						"Security scanning",
						"Code quality metrics",
					],
				},
				{
					subHead: "Knowledge Management",
					actions: [
						"Documentation standards",
						"Architecture diagrams",
						"Decision records",
						"Team guidelines",
					],
				},
			],
		},
		longTermActions: {},
		resources: {},
		timeline: {
			steps: [
				"30 Days: Process refinement",
				"90 Days: Quality improvements",
				"6 Months: Architecture optimization",
				"12 Months: Full best practice implementation",
			],
		},
	},
	{
		riskCategory: "Low Risk",
		summary: "Maintain and Innovate",
		detailedSummary:
			"Your system is well-maintained with minimal technical debt. Focus on maintaining this high standard while exploring innovations and improvements that can further enhance your technical capabilities.",
		immediateActions: {
			summary: "Maintenance Strategy",
			steps: [
				{
					subHead: "Continuous Improvement",
					actions: [
						"Regular system audits",
						"Proactive refactoring",
						"Documentation updates",
						"Performance optimization",
					],
				},
				{
					subHead: "Innovation Opportunities",
					actions: [
						"New technology evaluation",
						"Architecture modernization",
						"Automated tooling",
						"Advanced monitoring",
					],
				},
				{
					subHead: "Knowledge Excellence",
					actions: [
						"Best practice documentation",
						"Team training programs",
						"Innovation workshops",
						"Technical blog posts",
					],
				},
			],
		},
		shortTermActions: {
			summary: "Future-Proofing",
			steps: [
				{
					subHead: "Technology Stack",
					actions: [
						"Regular dependency updates",
						"Framework evaluations",
						"Tool assessment",
						"Security hardening",
					],
				},
				{
					subHead: "Architecture Evolution",
					actions: [
						"Scalability planning",
						"Cloud optimization",
						"Performance tuning",
						"Resilience testing",
					],
				},
				{
					subHead: "Team Development",
					actions: [
						"Skill matrix development",
						"Training programs",
						"Innovation time",
						"Knowledge sharing",
					],
				},
			],
		},
		longTermActions: {
			summary: "Success Preservation",
			steps: [
				{
					subHead: "Process Documentation",
					actions: [
						"Success patterns",
						"Lessons learned",
						"Best practices",
						"Decision records",
					],
				},
				{
					subHead: "Metrics and Monitoring",
					actions: [
						"Quality metrics",
						"Performance baselines",
						"Security scanning",
						"User satisfaction",
					],
				},
				{
					subHead: "Innovation Culture",
					actions: [
						"Experimental projects",
						"Research time",
						"Tech radar",
						"Architecture reviews",
					],
				},
			],
		},
		resources: {},
		timeline: {
			steps: [
				"Monthly: Regular audits and updates",
				"Quarterly: Innovation reviews",
				"Semi-annually: Architecture assessment",
				"Annually: Major version updates and stack review",
			],
		},
	},
];

async function seedRecommendations() {
	try {
		await mongoose.connect(connectionString);
		console.log("Connected to MongoDB");

		await RecommendationModel.deleteMany({});
		console.log("Existing recommendations cleared");

		const insertedRecommendations = await RecommendationModel.insertMany(
			recommendationsData
		);
		console.log(
			`${insertedRecommendations.length} recommendations inserted successfully`
		);

		await mongoose.connection.close();
		console.log("Database connection closed");
	} catch (error) {
		console.error("Error seeding database:", error);
		process.exit(1);
	}
}

seedRecommendations();
