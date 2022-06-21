/** Lay out the data format of each school faculty that will be save in the DB */
const mongoose = require("mongoose");

const facultyScheema = mongoose.Schema({
	fname: { 
        type: String, 
        required: true 
    },
	lname: { 
        type: String, 
        required: true 
    },
	email: { 
        type: String, 
        required: true 
    },

	password: { 
        type: String, 
        required: true 
    },
	phone: { 
        type: String, 
        required: true 
    },
    department: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("faculty", facultyScheema);
