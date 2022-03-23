const express = require("express");
const app = express();
app.use(express.json());

const connect = require("./configs/db.config");

const { register, login } = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");

app.post("/signup", register);
app.post("/signin", login);

app.use("/users", userController);
app.use("/posts", postController);

app.listen(8000, async () => {
	try {
		await connect();
		console.log("App is listening on port 8000");
	} catch (err) {
		console.log(err.message);
	}
});
