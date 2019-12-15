const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DesejosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  desejo: { type: String, required: true },
  valor: { type: Number, required: true },
  data_conquistar: { type: Date, required: true },
  data: {type: Date, default: Date.now},
  voce_precisa_poupar: {type: Number, default: 0},
})

const desejosModel = mongoose.model('desejos', DesejosSchema);

module.exports = {desejosModel, DesejosSchema};
