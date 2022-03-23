require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
	return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res.status(400).send({
				message: "email id already taken please try another email",
			});

		user = await User.create(req.body);

		const token = newToken(user);

		return res.status(201).json({ user, token });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const login = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		let username = await User.findOne({ name: req.body.name });
		if (!user)
			return res.status(400).send({
				message: "Invalid email or password or username",
			});
		if (!username)
			return res.status(400).send({
				message: "Invalid email or password or username",
			});
		const match = user.checkPassword(req.body.password);
		if (!match)
			return res.status(400).send({
				message: "Invalid email or password",
			});

		const token = newToken(user);

		res.status(200).send({ user, token });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = { register, login };
