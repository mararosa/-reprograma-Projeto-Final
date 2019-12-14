const express = require('express');
const router = express.Router();
const controller = require("../controllers/KidsController")

router.get('', controller.getAll) //vou tirar depois 
router.post('', controller.add) // adicionar kid
router.get('/:id', controller.getById) //ver seu perfil
router.patch('/:id', controller.update) // atualizar perfil
router.delete('/:id', controller.remove) // remover perfil 
router.post('/:id/cofrinhos', controller.addCofrinho) // criar um cofrinho
// router.patch('/:id/cofrinhos/:idCofrinhos', controller.updateCofrinho) // atualizar cofrinho, inserir valores



// router.get('/:id/cofrinho', controller.getCofrinho)
// // router.patch('/:id/gastos', controller.updateGastos)
// // router.get('/:id/gastos', controller.getGastos)
// router.post('/:id/desejo', controller.addDesejo)
// router.get('/:id/desejo', controller.getDesejo)

module.exports = router
