const { connect } = require('../models/dataBase')
const kidsModel = require('../models/KidsSchema')

connect()

const getAll = (request, response) => {
   kidsModel.find((error, kids) => {
      if (error) {
        return response.status(500).send(error)
      }
  
      return response.status(200).send(kids)
    })
  }




module.exports = {
getAll
}