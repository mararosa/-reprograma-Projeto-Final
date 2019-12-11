const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CofrinhoSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  data: { type: Date, required: true },
  descricao: { type: String, required = true },
  valor: { type: Number, required: true }
})

const cofrinhoModel = mongoose.model('cofrinho', CofrinhoSchema);

module.exports = cofrinhoModel;