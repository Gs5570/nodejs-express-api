const express = require("express");
const router = express.Router();

//import validator / pull out function check and validationResult
const { check, validationResult } = require("express-validator");

//import userSchema
const studentModel = require("../models/studentScheema");

//import facultySchema
const facultyModel = require('..//models/facultySchema')

//import json web token
const jwt = require("jsonwebtoken");

//import bcryptjs for creating password hash
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

/**create route */
//user login
router.post(
	"/",
	[
		check("email", "please provide a valid email").isEmail(),
		check("password", "please check your password").notEmpty(),
	],authMiddleware,
	async (req, res) => {
		const userData = req.body;
		const error = validationResult(req);
		//checks for validation errors
		if (!error.isEmpty()) {
			return res.json(error.array());
		}

		//reaching out to database
		try {
			//find user with provided email
			const userDB = await studentModel.findOne({ email: userData.email });

			if (!userDB) {
				return res.json("user not found!");
			}

			// compare plaintetx password to hashed password
			const verified = await bcrypt.compare(userData.password, userDB.password);

			if (!verified) {
				return res.json("Password is not a match!");
			}
            else{
                return res.status(200).json("success!");
            }
            //* ==========


            			//create new token JWT
			//payload information used to create the payload
			const payload = {
				id: user._id,
				// email:user.email
			};

			// const secret_key = "my_secret_key";  //recommended to have a long string

			// const token = jwt.sign(payload, secret_key)  //use this if secret key deine in the file

			const token = jwt.sign(payload, process.env.SECRET_KEY, {
				expiresIn: "4 Days",
			}); // use this id secret key define in .env file  & make the token expire in two days
            //send token to the front end.
			res.status(201).json({
				user: user,
				token: token,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json("server error!");
		}
	}
);

module.exports = router;
