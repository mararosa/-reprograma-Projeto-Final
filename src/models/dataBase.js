const mongoose = require("mongoose")
const DB_URL = "mongodb://localhost:27017/reprogramaProjetoFinal"

const connect = () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true })
    const connection = mongoose.connection
    connection.on('error', () => console.error('Erro ao conectar'))

    connection.once('open', () => console.log('Conectado no MongoDB'))
}

module.exports = { connect }

