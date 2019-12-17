require('dotenv-safe').config()
const mongoose = require("mongoose")
const DB_URL = process.env.MONGODB_URI


const connect = () => {
    mongoose.connect(DB_URL, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    const connection = mongoose.connection
    connection.on('error', () => console.error('Erro ao conectar'))

    connection.once('open', () => console.log('Conectado no MongoDB'))
}

module.exports = { connect }

