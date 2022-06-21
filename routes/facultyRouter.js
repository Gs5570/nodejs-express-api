const express = require("express");
const router = express.Router();

//import facultySchema
const facultyModel = require('../models/facultySchema')

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
//create faculty
router.post(
	"/",
	[
		// check("username", "username is required!").notEmpty(),
		check("email", "please use a valid email").isEmail(),
		check("password", "Please add a password with at leas 6 charcter")
			.isLength({ min: 6 })
			.not()
			.isEmpty(),
	],
	async (req, res) => {
		const facultyData = req.body;
		const errors = validationResult(req);
		//checks for validation errors
		if (!errors.isEmpty()) {
			return res.json(errors.array());
		}

		//reaching ou to DB
		try {
			// checking if there is an user with this email in the db
			const userExist = await facultyModel.findOne({
				email: facultyData.email,
			});

			if (userExist) {
				return res.json({ msg: "user already exist" });
			}

			// create salt
			var salt = await bcrypt.genSaltSync(10);
			//hash salt
			var hash = await bcrypt.hashSync(facultyData.password, salt);

			console.log(hash);
			//assign hashed password to password feild in user data
			facultyData.password = hash;

			const faculty = await facultyModel.create(facultyData);

			//create new token JWT
			//payload information used to create the payload
			const payload = {
				id: faculty._id,
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
				faculty: faculty,
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
		const getFaculty = await facultyModel.find(); // todomodel is related to any action you wanna take in your dataBase.find() method help fetch data from the database
		res.status(200).json(getFaculty);
	} catch (error) {
		console.log(error);
        
	}
});

//get students by id
router.get('/:id', authMiddleware, async (req, res) => {
	const id = req.params.id;

	try {
		const getFaculty = await facutlyModel.findById(id);
		res.status(200).json(getFaculty);
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
	const facultyData = req.body;

	try {
		//find by id and update
		const foundFaculty = await facultyModel.findByIdAndUpdate(id, facultyData, {
			new: true,
		});
		res.status(202).json(foundFaculty);
	} catch (error) {
		console.log(error);
	}
});

//! Delete a student by id

router.delete("/:id", authMiddleware, async (req, res) => {
	const id = req.params.id;

	try {
		const deleteFaculty = await facultyModel.findByIdAndDelete(id);
		res.status(200).json({ msg: "student was was deleted" });
	} catch (error) {
		console.log(error);
	}
});


module.exports = router;
