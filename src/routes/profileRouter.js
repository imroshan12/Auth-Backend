import express from "express";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";
import { hashData } from "../utils/hashData.js";

const profileRouter = express.Router();

//Protected Routes

// *****   GET PROFILE OF THE USER    *******
profileRouter.get("/", verifyToken, async (req, res) => {
    try {
        // Find the user details
        const { email } = req.currentUser;
        const getUser = await User.findOne({ email });

        // Arrange the data
        const data = {
            username: getUser.username,
            email: getUser.email
        };

        // Return the data to the user
        return res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        return res.status(200).json({
            status: "success",
            message: error.message
        });
    }
});


// ******   UPDATE PROFILE OF THE USER    ******
profileRouter.put("/", verifyToken, async (req, res) => {
    try {
        // Find the user details
        const { email } = req.currentUser;
        const foundUser = await User.findOne({ email });

        // Extract the data from the request
        let { username, password } = req.body;
        username = username ? username.trim() : foundUser.username;
        password = password ? password.trim() : foundUser.password;

        // Validate user data to be updated
        if (!(username && /^[a-zA-Z0-9]*$/.test(username))) {
            throw Error("Invalid or empty username entered!");
        }
        if (password && password.length < 8) {
            throw Error("Password must be 8 characters long");
        }

        // Hash the password
        const hashedPassword = await hashData(password);


        // Update the data in the database
        const updatedData = await User.findOneAndUpdate({ email }, {
            username,
            password: hashedPassword,
        }, {
            new: true
        });


        // Return the result
        return res.status(200).json({
            status: 'success',
            data: { ...updatedData._doc }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
});

export default profileRouter;