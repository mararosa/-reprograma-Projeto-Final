const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DesejosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  desejo: { type: String, required: true },
  data_conquistar: { type: Date, required: true },
  data_desejou: {type: Date, default: new Date},
  descricao_data: {type: String},
  valor: { type: Number, required: true },
})

const desejosModel = mongoose.model('desejos', DesejosSchema);

module.exports = {desejosModel, DesejosSchema};
