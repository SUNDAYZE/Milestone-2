//Dependencies

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'

const app = express()

//Middleware

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://jaylinmanuel02:FF4Utbkr3K27Ninv@recipes.yn0brrg.mongodb.net/recipes?retryWrites=true&w=majority");

//Listen 

app.listen(3001, () => console.log("SERVER STARTED!!"))