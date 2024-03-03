const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected to mongodb"))
    .catch(err => console.error(err))

const userSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Phone: {
        type: String
    }
})

const User = mongoose.model('users', userSchema)

module.exports = { User }