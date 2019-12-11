const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const KidsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  idade: { type: String, required: true },
  senha: { type: String, required = true },
  login: { type: String, required = true, unique = true},
})

const kidsModel = mongoose.model('kids', KidsSchema);

module.exports = kidsModel;