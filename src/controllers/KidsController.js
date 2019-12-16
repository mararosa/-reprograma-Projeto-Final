const { connect } = require('../models/dataBase')
const kidsModel = require('../models/KidsSchema')
const { cofrinhosModel } = require('../models/CofrinhosSchema')
const { desejosModel } = require('../models/DesejosSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SEGREDO = "MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAik2HM1Ke1T8VbdG4M+a2IKPf3MoNjgAV/0nkqRoEqJNh8LsghEu7AaaBvSD9G2XnnXT8KsMAFsLu7x98vqWA1QIDAQABAkBuXVPIpuPM9BxbmIHQGQm5nkwkWrDaYkMrh4ILV5HkGxe5JPYTRUaNfY6BvHXk9tMZSWVP2BskwaBSefyiMc95AiEA37gKQ0R/60o9yLaUBLqYNUFPxcbvgDEn5zB1Omtm3yMCIQCeQk0liazOosLmHzyG9pZ2APVbE7UOuD6Y3LgRQa3bpwIgDFm6p1AGx9SHaKc7sK8ka/w5DTAYVLlh/I9eSWVYfoUCIBNMkovZVjF8t7fIZ2EuAPsy8rjAlnvNDBUoFWpFUCZRAiEAix9iepI6LS4sX+9/0pw9SrxVzMxoC7ZBjKZyA4sAttw="

connect()
//funcção para calcular o valor do desejo/dias
const calculo = 1000 * 60 * 60 * 24;
function diffDias(dataGerada, dataDesejo, valor) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(dataGerada.getFullYear(), dataGerada.getMonth(), dataGerada.getDate());
    const utc2 = Date.UTC(dataDesejo.getFullYear(), dataDesejo.getMonth(), dataDesejo.getDate());

    const dias = Math.floor((utc2 - utc1) / calculo)
    return Math.abs(valor / dias);
}



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
    if (!request.body.senha) {
        return response.status(400).send('Digite sua senha!')
    }
    const senhaCriptografada = bcrypt.hashSync(request.body.senha)
    request.body.senha = senhaCriptografada
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

// adicionar um cofrinho, ex, cofrinho do desejo
const addCofrinhos = async (request, response) => {
    const id = request.params.id
    const cofrinho = request.body
    const novoCofrinho = new cofrinhosModel(cofrinho)
    const kid = await kidsModel.findById(id)
    kid.cofrinhos.push(novoCofrinho)
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        return response.status(201).send(kid)
    })
}

// ver todos os cofrinhos
const getAllCofrinhos = async (request, response) => {
    const id = request.params.id
    await kidsModel.findById(id, (error, kid) => {
        if (error) {
            return response.status(500).send(error)
        }

        if (kid) {
            return response.status(200).send(kid.cofrinhos)
        }

        return response.status(404).send('Usuário não encontrado.')
    })
}

// Atualiza o cofrinho, adiciona valores no cofrinho. preciso pedir a id do cofrinho
const updateCofrinhoEntradas = async (request, response) => {
    const id = request.params.id
    const idCofrinho = request.params.idCofrinho
    const kid = await kidsModel.findById(id)
    const cofrinho = kid.cofrinhos.find((cofrinho) => idCofrinho == cofrinho._id)
    cofrinho.poupado += request.body.valor
    cofrinho.saldoCofrinho = cofrinho.poupado - cofrinho.gastos
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        return response.status(200).send(kid)
    })
}

// Atualiza o cofrinho, retira valores do cofrinho.
const updateCofrinhoSaidas = async (request, response) => {
    const id = request.params.id
    const idCofrinho = request.params.idCofrinho
    const kid = await kidsModel.findById(id)
    const cofrinho = kid.cofrinhos.find((cofrinho) => idCofrinho == cofrinho._id)
    cofrinho.gastos += request.body.valor
    cofrinho.saldoCofrinho = cofrinho.poupado - cofrinho.gastos
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        return response.status(200).send(kid)
    })
}

// Lista cofrinho pela id
const getCofrinhoById = async (request, response) => {
    const id = request.params.id
    const idCofrinho = request.params.idCofrinho
    const kid = await kidsModel.findById(id)
    const cofrinho = kid.cofrinhos.find((cofrinho) => {
        return idCofrinho == cofrinho._id
    })
    if (cofrinho) {
        return response.status(200).send(cofrinho)
    }
    return response.status(404).send('Cofrinho não encontrado.')
}

//remove cofrinho pela id
const removeCofrinho = async (request, response) => {
    const id = request.params.id
    const idCofrinho = request.params.idCofrinho
    const kid = await kidsModel.findById(id)
    const cofrinho = kid.cofrinhos.find(cofrinho => idCofrinho == cofrinho._id)
    const cofrinhoIndex = kid.cofrinhos.indexOf(cofrinho)
    console.log(cofrinho) // ta dando undefined
    console.log(kid)
    kid.cofrinhos.splice(cofrinhoIndex, 1)
    kid.save((error, kid) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
            return response.status(200).send('Cofrinho deletado!')
        }
        return response.status(404).send('Cofrinho não encontrado') //nao esta funcionando
    })
}

// cria um desejo/objetivo
const addDesejos = async (request, response) => {
    const id = request.params.id
    const desejo = request.body
    const novoDesejo = new desejosModel(desejo)
    const kid = await kidsModel.findById(id)
    kid.desejos.push(novoDesejo)
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
            return response.status(201).send(kid)
        }
    })
}

//Lista todos os desejos
const getAllDesejos = async (request, response) => {
    const id = request.params.id
    await kidsModel.findById(id, (error, kid) => {
        if (error) {
            return response.status(500).send(error)
        }

        if (kid) {
            return response.status(200).send(kid.desejos)
        }

        return response.status(404).send('Usuário não encontrado.')
    })
}

// calcula o valor do desejo e divide pelos dias (data a conquistar vs data que gerou o desejo)
const calculaValorDesejo = async (request, response) => {
    const id = request.params.id
    const idDesejo = request.params.idDesejo
    const valor = request.body.valor
    const kid = await kidsModel.findById(id)
    console.log(kid)
    const desejo = kid.desejos.find((desejo) => idDesejo == desejo._id)
    console.log(desejo)
    const dataGerada = desejo.data,
        dataDesejo = desejo.data_conquistar,
        valorDias = diffDias(dataGerada, dataDesejo, valor);
    desejo.valor = valor
    console.log(valorDias)
    kid.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        return response.status(200).send('Você precisará poupar: ' + valorDias + ' por dia :) ')
    })
}


// Lista desejo pela id
const getDesejoById = async (request, response) => {
    const id = request.params.id;
    const idDesejo = request.params.idDesejo;
    const kid = await kidsModel.findById(id);
    const desejo = kid.desejos.find((desejo) => {
        return idDesejo == desejo._id
    })
    if (desejo) {
        return response.status(200).send(desejo)
    }
    return response.status(404).send('Desejo não encontrado.')
}

//remove desejo pela id
const removeDesejo = async (request, response) => {
    const id = request.params.id
    const idDesejo = request.params.idDesejo
    const kid = await kidsModel.findById(id)
    const desejo = kid.desejos.find(desejo => idDesejo == desejo._id)
    const desejoIndex = kid.desejos.indexOf(desejo)
    kid.desejos.splice(desejoIndex, 1)
    console.log(desejo) // ta dando undefined
    kid.save((error, kid) => {
        if (error) {
            return response.status(500).send(error)
        }
        if (kid) {
            return response.status(200).send('Desejo deletado!')
        }
        return response.status(404).send('Desejo não encontrado') //nao esta funcionando
    })
}

//criar login
const login = async (request, response) => {
    const kidEncontrada = await kidsModel.findOne({ login: request.body.login })
    if (kidEncontrada) {
        const senhaCorreta = bcrypt.compareSync(request.body.senha, kidEncontrada.senha)
        if (senhaCorreta) {
            return response.status(200).send( 'Logado!')
        }
        return response.status(401).send('Senha incorreta.')
    }
    return response.status(404).send('Usuário não encontrado.')
}


module.exports = {
    getAll,
    add,
    getById,
    update,
    remove,
    addCofrinhos,
    getAllCofrinhos,
    updateCofrinhoEntradas,
    updateCofrinhoSaidas,
    getCofrinhoById,
    removeCofrinho,
    addDesejos,
    getAllDesejos,
    calculaValorDesejo,
    getDesejoById,
    removeDesejo,
    login
}