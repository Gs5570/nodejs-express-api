const express = require("express");
const router = express.Router();

//import studentSchema
const studentModel = require("../models/studentScheema");

//import validator / pull out function check and validationResult
const { check, validationResult } = require("express-validator");

//import bcryptjs for creating password hash
const bcrypt = require("bcryptjs");
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);

//import json web token
const jwt = require("jsonwebtoken");

//import authMiddleware
const authMiddleware = require('../middleware/authMiddleware')

/**Routes */
//create students
router.post(
	"/",
	[
		// check("username", "username is required!").notEmpty(),
		check("email", "please use a valid email").isEmail(),
		check("password", "Please add a password with at leas 6 charcter")
			.isLength({ min: 6 })
			.not()
			.isEmpty(),
	],authMiddleware,
	async (req, res) => {
		const studentData = req.body;
		const errors = validationResult(req);
		//checks for validation errors
		if (!errors.isEmpty()) {
			return res.json(errors.array());
		}

		//reaching ou to DB
		try {
			// checking if there is an user with this email in the db
			const userExist = await studentModel.findOne({
				email: studentData.email,
			});

			if (userExist) {
				return res.json({ msg: "user already exist" });
			}

			// create salt
			var salt = await bcrypt.genSaltSync(10);
			//hash salt
			var hash = await bcrypt.hashSync(studentData.password, salt);

			console.log(hash);
			//assign hashed password to password feild in user data
			studentData.password = hash;

			const student = await studentModel.create(studentData);

			//create new token JWT
			//payload information used to create the payload
			const payload = {
				id: student._id,
				// email:user.email
			};

			// const secret_key = "my_secret_key";  //recommended to have a long string

			// const token = jwt.sign(payload, secret_key)  //use this if secret key deine in the file

			const token = jwt.sign(payload, process.env.SECRET_KEY, {
				expiresIn: "4 Days",
			}); 
            // use this id secret key define in .env file  & make the token expire in two days
			//send token to the front end.
			// const studentCreated = await studentModel.create(student);
			// res.status(201).json(studentCreated);

            //return token to front end
            res.status(201).json({
				student: student,
				token: token,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json("bad request");
		}
	}
);

//get students
router.get("/", authMiddleware,async (req, res) => {
	try {
		const getStudent = await studentModel.find(); // todomodel is related to any action you wanna take in your dataBase.find() method help fetch data from the database
		res.status(200).json(getStudent);
	} catch (error) {
		console.log(error);
        
	}
});

//get students by id
router.get('/:id', authMiddleware, async (req, res) => {
	const id = req.params.id;

	try {
		const getStudent = await studentModel.findById(id);
		res.status(200).json(getStudent);
	} catch (error) {
		console.error(error);
		res.status(400).json({
			msg: "id  not found",
		});
	}
})

//* Update students by ID
router.put("/:id", authMiddleware, async (req, res) => {
	const id = req.params.id;
	const studentData = req.body;

	try {
		//find by id and update
		const foundStudent = await studentModel.findByIdAndUpdate(id, studentData, {
			new: true,
		});
		res.status(202).json(foundStudent);
	} catch (error) {
		console.log(error);
	}
});

//! Delete a student by id

router.delete("/:id", authMiddleware, async (req, res) => {
	const id = req.params.id;

	try {
		const deleteStudent = await studentModel.findByIdAndDelete(id);
		res.status(200).json({ msg: "student was was deleted" });
	} catch (error) {
		console.log(error);
	}
});


module.exports = router;
