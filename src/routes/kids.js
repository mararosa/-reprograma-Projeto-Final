require('dotenv').load
const express = require('express');
const router = express.Router();
const controller = require("../controllers/KidsController")
const jwt = require('jsonwebtoken')
const SEGREDO = process.env.SEGREDO
const autenticar = (request, response, next) => {
    const authHeader = request.get('authorization')
    let autenticado = false
    if (!authHeader) {
        return response.status(401).send('Você precisa fazer login!')
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, SEGREDO, (error, decoded) => {
        if (error) {
            autenticado = false
        } else {
                autenticado = true
            }
        }
    )
    if (!autenticado) {
        return response.status(403).send('Acesso negado.')
    }
    next()
}

router.get('', controller.getAll) //vou tirar depois 
router.post('', autenticar, controller.add) // adiciona kid
router.get('/:id', autenticar, controller.getById) //lista perfil
router.patch('/:id', autenticar, controller.update) // atualiza perfil
router.delete('/:id', autenticar, controller.remove) // remove perfil 
router.post('/:id/cofrinhos', autenticar, controller.addCofrinhos) // cria um cofrinho
router.get('/:id/cofrinhos', autenticar, controller.getAllCofrinhos) // lista todos os cofrinhos
router.patch('/:id/cofrinhos/:idCofrinho/adicionar', autenticar, controller.updateCofrinhoEntradas) // atualiza cofrinho, adicionar valores
router.patch('/:id/cofrinhos/:idCofrinho/retirar', autenticar, controller.updateCofrinhoSaidas) // atualizar cofrinho, retirar valores
router.get('/:id/cofrinhos/:idCofrinho', autenticar, controller.getCofrinhoById) // lista cofrinho
router.delete('/:id/cofrinhos/:idCofrinho', autenticar, controller.removeCofrinho) // remove cofrinho 
router.post('/:id/desejos', autenticar, controller.addDesejos) // cria um desejo
router.get('/:id/desejos', autenticar, controller.getAllDesejos) // lista todos os desejos
router.patch('/:id/desejos/:idDesejo/calcularValor', autenticar, controller.calculaValorDesejo) // calcula valor do desejo 
router.get('/:id/desejos/:idDesejo', autenticar, controller.getDesejoById) // lista desejo
router.delete('/:id/desejos/:idDesejo', autenticar, controller.removeDesejo) // remove desejo
router.post('/login', controller.login) //add login

module.exports = router
