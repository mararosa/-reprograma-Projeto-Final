const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CofrinhosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome_cofrinho: {type: String, required: true},
  data: { type: Date, default: Date.now },
  // valor: { type: Number},
  saldoCofrinho: {type: Number, default: 0 },
  saldoGastos: {type: Number, default: 0 },
  
})

const cofrinhosModel = mongoose.model('cofrinhos', CofrinhosSchema);


module.exports = {cofrinhosModel, CofrinhosSchema};