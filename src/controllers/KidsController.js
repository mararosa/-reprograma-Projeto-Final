const { connect } = require('../models/dataBase')
const kidsModel = require('../models/KidsSchema')
const { cofrinhosModel } = require('../models/CofrinhosSchema')
// const { gastosModel } = require('../models/GastosSchema')
const { desejosModel } = require('../models/DesejosSchema')

connect()

//vou apagar esse depois
const getAll = (request, response) => {
    kidsModel.find((error, kids) => {
        if (error) {
            return response.status(500).send(error)
        }
        return response.status(200).send(kids)
    })
}

//adicionar uma criança/perfil
const add = (request, response) => {
    const novaKid = new kidsModel(request.body)
    novaKid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        return response.status(201).send(novaKid)
    })
}

//kid ver seu perfil
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

//kid atualizar seu perfil
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

//kid remover o perfil do banco de dados
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
    kid.saldoCofrinho += request.body.valor
    kid.cofrinho.push(novoCofrinho)
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
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

//   const updateGastos = async (request, response) => {
//     const id = request.params.id
//     const gastos = request.body
//     const options = { new: true }
//     const novoGasto = new gastosModel(gastos)
//     const kid = await kidsModel.findById(id)
//     // if (!kid) {
//     // return response.status(404).send('Usuário não encontrado') //nao faz sentido ter essa rota
//     // }
//     kid.saldoGastos += request.body.valor
//     kid.gastos.push(novoGasto)
//     kid.save((error) => {
//         if (error) {
//             return response.status(500).send(error)
//         }
//         if (kid) {
//         return response.status(201).send(kid)
//         }
//     })
// }

// const getGastos = async (request, response) => {
//     const id = request.params.id
//     await kidsModel.findById(id, (error, kid) => {
//       if (error) {
//         return response.status(500).send(error)
//       }
//       if (kid) {
//         return response.status(200).send(kid.gastos)
//       }
//       return response.status(404).send('Usuário não encontrado.')
//     })
//   }

const addDesejo = async (request, response) => { // nao quero que a kid coloque mais de um desejo/objetivo
    const id = request.params.id
    const desejo = new desejosModel(request.body)
    const options = { new: true }
    const kid = await kidsModel.findById(id)
    kid.desejo.push(desejo)
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
            return response.status(201).send(kid)
        }
    })
}

const getDesejo = async (request, response) => {
    const id = request.params.id
    await kidsModel.findById(id, (error, kid) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
            return response.status(200).send(kid.desejo)
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
    // updateGastos,
    // getGastos,
    addDesejo,
    getDesejo,
}