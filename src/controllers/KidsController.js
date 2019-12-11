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

const add = (request, response) => {
    const novaKid = new kidsModel(request.body)

    novaKid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        return response.status(201).send(error)
    })
}


module.exports = {
    getAll,
    add,
    
}