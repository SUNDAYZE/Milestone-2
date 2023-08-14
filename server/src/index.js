import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { userRouter } from './routes/users.js'

const app = express()


app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)

mongoose.connect("mongodb+srv://jscf222:MBBLecq0Hlae@recipe.uqprtdw.mongodb.net/recipe")

app.listen(3001, () => console.log('SERVER STARTED!'))
