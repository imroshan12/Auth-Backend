import User from "../models/User.js";
import hashData from "../utils/hashPassword.js";

export const createNewUser = async (data) => {
    try {
        const { email, username, password } = data;

        const userExists = await User.findOne({ email });

        if (userExists) {
            throw Error("User already exists");
        }

        const hashedPassword = await hashData(password);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const createdUser = await newUser.save();
        return createdUser;
    } catch (error) {
        throw error;
    }
}