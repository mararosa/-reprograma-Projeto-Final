const mongoose = require('mongoose');
const { CofrinhosSchema } = require('./CofrinhosSchema')
const { DesejosSchema } = require('./DesejosSchema')
const Schema = mongoose.Schema;
const KidsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  idade: { type: Number, mix: 6, required: true },
  senha: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  cofrinhos: [CofrinhosSchema], 
  desejos: [DesejosSchema]
})

const kidsModel = mongoose.model('kids', KidsSchema);

module.exports = kidsModel; 
