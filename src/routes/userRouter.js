import express from "express";
import { createNewUser, authenticateUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!(email && password)) {
            throw Error("Email and/or password field is empty");
        }
        email = email.trim();
        password = password.trim();

        const authenticatedUser = await authenticateUser({ email, password });

        return res.status(200).json(authenticatedUser);
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
});

userRouter.post("/register", async (req, res) => {
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
        } else if (password.length < 8) {
            throw Error("Password must be 8 characters long");
        } else {
            const newUser = await createNewUser({
                username,
                email,
                password
            });
            return res.status(200).json(newUser);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
});

userRouter.post("/logout", verifyToken, async (req, res) => {
    try {
        const { email } = req.currentUser;
        const currentUser = await User.findOne({ email });

        const tokens = currentUser.tokens;

        const newTokens = tokens.filter(t => t !== req.token);

        await User.findOneAndUpdate({ email }, { tokens: newTokens }, { new: true });
        res.status(203).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
});

export default userRouter;