const { connect } = require('../models/dataBase')
const kidsModel = require('../models/KidsSchema')
const { cofrinhosModel } = require('../models/CofrinhosSchema')
const { gastosModel } = require('../models/GastosSchema')
const { desejosModel } = require('../models/DesejosSchema')

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
        return response.status(201).send(novaKid)
    })
}


const getById = (request, response) => {
    const id = request.params.id
    kidsModel.findById(id, (error, kid) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
           return response.status(200).send(kid)
        }
        return response.status(404).send('Usuário não encontrado.')
    })
}

const update = (request, response) => {
    const id = request.params.id
    const kidUpdate = request.body
    const options = { new: true }
    kidsModel.findByIdAndUpdate(
        id,
        kidUpdate,
        options,
        (error, kid) => {
            if (error) {
                return response.status(500).send(error)
            }
            if (kid) {
                return response.status(200).send(kid)
            }
            return response.status(404).send('Usuário não encontrado.')
        }
    )
}

const remove = (request, response) => {
    const id = request.params.id
    kidsModel.findByIdAndDelete(id, (error, kid) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
            return response.status(200).send('Usuário deletado!')
        }
        return response.status(404).send('Usuário não encontrado')
    })
}

const updateCofrinho = async (request, response) => {
    const id = request.params.id
    const cofrinho = request.body
    const options = { new: true }
    const novoCofrinho = new cofrinhosModel(cofrinho)
    const kid = await kidsModel.findById(id) 
    console.log(kid)
    // if (!kid) {
    //     return response.status(404).send('Usuário não encontrado')
    //     }
    kid.cofrinho.push(novoCofrinho)
    console.log(kid.cofrinho)
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error) // ele da erro ai nao chega aqui fica no looping pq precisa fazer um calculo cumulativo e nao consegur
        }
        if (kid) {
        kid.saldoCofrinho += request.body.valor // ele tenta fazer isso antes e como id passada eh errada ele trava
        return response.status(201).send(kid)
        }
    })
}

const getCofrinho = async (request, response) => {
    const id = request.params.id
    await kidsModel.findById(id, (error, kid) => {
      if (error) {
        return response.status(500).send(error)
      }
      if (kid) {
        return response.status(200).send(kid.cofrinho)
      }
      return response.status(404).send('Usuário não encontrado.')
    })
  }
  
  const updateGastos = async (request, response) => {
    const id = request.params.id
    const gastos = request.body
    const options = { new: true }
    const novoGasto = new gastosModel(gastos)
    const kid = await kidsModel.findById(id)
    // if (!kid) {
    // return response.status(404).send('Usuário não encontrado')
    // }
    kid.saldoGastos += request.body.valor
    kid.gastos.push(novoGasto)
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
        return response.status(201).send(kid)
        }
    })
}

const getGastos = async (request, response) => {
    const id = request.params.id
    await kidsModel.findById(id, (error, kid) => {
      if (error) {
        return response.status(500).send(error)
      }
      if (kid) {
        return response.status(200).send(kid.gastos)
      }
      return response.status(404).send('Usuário não encontrado.')
    })
  }
  


module.exports = {
    getAll,
    add,
    getById,
    update,
    remove,
    updateCofrinho,
    getCofrinho,
    updateGastos,
    getGastos,
}