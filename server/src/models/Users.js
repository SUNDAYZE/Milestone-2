//Dependicies 

import mongoose from "mongoose";

//Schema 

const UserSchema = new mongoose.Schema({
    username: { type: String, requried: true, unique: true},
    password: { type: String, required: true},
});

export const UserModel = mongoose.model("users", UserSchema);
