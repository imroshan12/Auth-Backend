import express from "express";
import { createNewUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!(username && email && password)) {
            throw Error("Empty input fields!");
        }
        username = username.trim();
        email = email.trim();
        password = password.trim();
        if (!/^[a-zA-Z ]*$/.test(username)) {
            throw Error("Invalid username entered!");
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw Error("Invalid email entered");
        } else if (password.length < 1) {
            throw Error("Password must be 8 characters long");
        } else {
            const newUser = await createNewUser({
                username,
                email,
                password
            });
            res.status(200).json(newUser);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
});

export default userRouter;