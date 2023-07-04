import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    token: String
});

const User = model("User", userSchema);

export default User;



