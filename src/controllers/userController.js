import User from "../models/User.js";
import { hashData, compareHashData } from "../utils/hashData.js";
import { assignToken } from "../utils/assignToken.js";
const { TOKEN_VALIDITY_SECONDS } = process.env;

export const authenticateUser = async (data) => {
    try {
        const { email, password } = data;

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            throw Error("User not found");
        }

        const hashedPassword = foundUser.password;

        const passwordMatch = compareHashData(password, hashedPassword);

        if (!passwordMatch) {
            throw Error("Incorrect password");
        }

        // Create token for the user
        const tokenData = {
            userId: foundUser._id,
            email
        };

        const token = await assignToken(tokenData);

        let oldTokens = foundUser.tokens || [];

        if (oldTokens.length) {
            oldTokens = oldTokens.filter(t => {
                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                if (timeDiff < TOKEN_VALIDITY_SECONDS) {
                    return t;
                }
            })
        }

        await User.findByIdAndUpdate(foundUser._id, {
            tokens: [...oldTokens,
            { token, signedAt: Date.now().toString() }]
        });

        const userData = {
            username: foundUser.username,
            email: foundUser.email,
            token,
        };
        return userData;
    } catch (error) {
        throw error
    }
}

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