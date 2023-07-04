import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    tokens: [{ type: Object }]
});

const User = model("User", userSchema);

export default User;



