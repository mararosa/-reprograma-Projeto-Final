const express = require('express');
const router = express.Router();
const controller = require("../controllers/KidsController")

router.get('', controller.getAll) //vou tirar depois 
router.post('', controller.add) // adiciona kid
router.get('/:id', controller.getById) //lista perfil
router.patch('/:id', controller.update) // atualiza perfil
router.delete('/:id', controller.remove) // remove perfil 
router.post('/:id/cofrinhos', controller.addCofrinhos) // cria um cofrinho
router.get('/:id/cofrinhos', controller.getAllCofrinhos) // lista todos os cofrinhos
router.patch('/:id/cofrinhos/:idCofrinho/adicionar', controller.updateCofrinhoEntradas) // atualiza cofrinho, adicionar valores
router.patch('/:id/cofrinhos/:idCofrinho/retirar', controller.updateCofrinhoSaidas) // atualizar cofrinho, retirar valores
router.get('/:id/cofrinhos/:idCofrinho', controller.getCofrinhoById) // lista cofrinho
router.delete('/:id/cofrinhos/:idCofrinho', controller.removeCofrinho) // remove perfil 
router.post('/:id/desejos', controller.addDesejos) // cria um desejo
router.get('/:id/desejos', controller.getAllDesejos) // lista todos os desejos
router.patch('/:id/desejos/:idDesejo/calcularValor', controller.calculaValorDesejo) // calcula valor do desejo 
router.get('/:id/desejos/:idDesejo', controller.getDesejoById) // lista desejo
// router.get('/:id/desejos', controller.getDesejo)

module.exports = router
