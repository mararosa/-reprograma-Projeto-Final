const mongoose = require('mongoose');
const { CofrinhoSchema } = require('./CofrinhoSchema')
const { GastosSchema } = require('./GastosSchema')
const { DesejosSchema } = require('./DesejosSchema')
const Schema = mongoose.Schema;
const KidsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  idade: { type: Number, max: 16, required: true },
  senha: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },

})

const kidsModel = mongoose.model('kids', KidsSchema);

module.exports = kidsModel;