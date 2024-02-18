const express = require('express')
const bp = require("body-parser");
const app = express()
const mongoose = require('mongoose')
const groupRouter = require('./routes/group.routes')
const eventRouter = require('./routes/event.routes')
const userRouter = require('./routes/user.routes')

require('dotenv').config()

const port = process.env.PORT || 8080

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 1000 * 20,
    connectTimeoutMS: 1000 * 20,
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/group', groupRouter)
app.use('/event', eventRouter)
app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

module.exports = app