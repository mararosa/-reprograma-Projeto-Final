const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CofrinhosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome_cofrinho: {type: String, required: true},
  data: { type: Date, default: Date.now },
  saldoCofrinho: {type: Number, default: 0 },
  poupado: {type: Number, default: 0},
  gastos: {type: Number, default: 0 },
  
})

const cofrinhosModel = mongoose.model('cofrinhos', CofrinhosSchema);


module.exports = {cofrinhosModel, CofrinhosSchema};