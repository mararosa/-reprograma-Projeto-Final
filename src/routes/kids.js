const express = require('express');
const router = express.Router();
const controller = require("../controllers/KidsController")

router.get('', controller.getAll) //vou tirar depois 
router.post('', controller.add) // adiciona kid
router.get('/:id', controller.getById) //lista perfil
router.patch('/:id', controller.update) // atualiza perfil
router.delete('/:id', controller.remove) // remove perfil 
router.post('/:id/cofrinhos', controller.addCofrinhos) // cria um cofrinho
router.patch('/:id/cofrinhos/:idCofrinho/adicionar', controller.updateCofrinhoEntradas) // atualiza cofrinho, adicionar valores
router.patch('/:id/cofrinhos/:idCofrinho/retirar', controller.updateCofrinhoSaidas) // atualizar cofrinho, retirar valores
router.get('/:id/cofrinhos/:idCofrinho', controller.getCofrinhoById) // lista cofrinho
router.delete('/:id/cofrinhos/:idCofrinho', controller.removeCofrinho) // remove perfil 


// // router.patch('/:id/gastos', controller.updateGastos)
// // router.get('/:id/gastos', controller.getGastos)
// router.post('/:id/desejo', controller.addDesejo)
// router.get('/:id/desejo', controller.getDesejo)

module.exports = router
