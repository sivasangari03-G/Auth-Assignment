const express = require("express");
const Post = require("../models/post.model");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("", authenticate, async (req, res) => {
	try {
		const user_id = req.user.user._id;
		console.log(user_id);
		const post = await Post.create({
			title: req.body.title,
			body: req.body.body,
			user_id: user_id,
		});
		return res.status(201).json(post);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("", authenticate, async (req, res) => {
	try {
		const user_id = req.user.user._id;
		console.log(user_id);
		const post = await Post.find();
		return res.status(201).json(post);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

module.exports = router;
