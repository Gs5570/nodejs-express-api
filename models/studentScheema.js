const mongoose = require("mongoose");
const studentScheema = mongoose.Schema({
	fname: {
		type: String,
		required: true,
	},

	lname: {
		type: String,
		required: true,
	},

	term: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	phone: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	degreeType: {
		type: String,
		required: true,
	},
	degree: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("students", studentScheema);
