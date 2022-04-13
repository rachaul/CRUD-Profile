require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect = (process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(err))
db.once('error', (error) => console.log(`Database has connected`))

app.use(express.json())

const profileRoutes = require('./routes/profile')
app.use('/profile', profileRoutes)

app.listen(2000, () => console.log(`Server has Connected`))