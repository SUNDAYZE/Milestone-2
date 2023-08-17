//Dependicies 

import mongoose from "mongoose";

//Schema 

const UserSchema = new mongoose.Schema({
    username: { type: String, requried: true, unique: true},
    password: { type: String, required: true},
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}]
});

export const UserModel = mongoose.model("users", UserSchema);
