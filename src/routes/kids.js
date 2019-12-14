const express = require('express');
const router = express.Router();
const controller = require("../controllers/KidsController")

router.get('', controller.getAll)
router.post('', controller.add)
router.get('/:id', controller.getById)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)
router.patch('/:id/cofrinho', controller.updateCofrinho)
router.get('/:id/cofrinho', controller.getCofrinho)
router.patch('/:id/gastos', controller.updateGastos)
router.get('/:id/gastos', controller.getGastos)
router.post('/:id/desejo', controller.addDesejo)
router.get('/:id/desejo', controller.getDesejo)

module.exports = router
