const express = require('express') 
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongo = require("./models/dataBase")
mongo.connect()

///////////////rotas
const index = require("./routes/index")

////////////////////////////////
app.use(cors())
app.use(bodyParser.json())
app.use("/", index)



module.exports = app