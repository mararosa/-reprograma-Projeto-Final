const express = require('express');
const router = express.Router();
const controller = require("../controllers/KidsController")
const jwt = require('jsonwebtoken')
const SEGREDO = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMvjU3H0JWqXLTN1krauUYFEziZLTm8iLmDjL1TUg6u+58PZY0olHh3hou/q5EdOU5y5P1UmIAQ0SquueCXw2NSvevDstQ3pq5EJDzsLq5mU8S/IAQNXMO5T+hSQ+SsMkBHKS2IgjWC3v4Aqn/s4ZCFbG7qfSf3RIgZshbSuZDbNAgMBAAECgYEAltHnJTFkCDAiSKGdULMsKYKbOCqWr5DKW/NSTN8TM5V5Xh/N2cgROitx2yWXjcO8B//kgHk+T73aypq5198MlR0Ks7tPCv+vMIXflobSRj+Hqas68X24PSss4REq70fUBUbI2hMeiVhOSxtwKWhL5v4uQmQseIia2dUUKmJ8XaUCQQD1SUpwXkc9ABe3OV89zhfqAjb4SCnF5/EqkfjG7/ns3e/Q6sxanDEkglW6rmsjT4x0DqV7ziWlDTG1WP8EC+YvAkEA1MsiHFKErFob12yicD2ZD9zebLT2/Nu/vDVH+NftLH/x6oRTPMIuMUTpCGDaYj6lSw9MI7IawV5ENLt8K/LvwwJAYOQyo3Cac142AAqJtMBUcfut+yWGWsbkXQyMWQkykH6a3MvjLWfFgcZ6VuPPLoOd17pxZBZqiGhN2nTtR4vrwQJAJVYa/xMvejo5RlwmSEFWmOTtFe/OomFATBqhLTVdxQASB07+d9uuVTC9Hp430yMgx4HAn0bB0QnkN8hpqiBvFwJALPRxgbjIK51DstortwIGAas9n7UUYWA74uXfGDLkuV9knq0/1T7F2VU4HuYKfHEneXLk/W55bCDc2OBinkAVwA=='

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
