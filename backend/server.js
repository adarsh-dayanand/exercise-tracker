const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.once('open', () => {

    console.log('MongoDB is connected');

})

const exercisesRouter = require('./routes/exercises.js')
const usersRouter = require('./routes/users.js')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)


app.listen(port, ()=> console.log(`Port is up on port ${port}`))