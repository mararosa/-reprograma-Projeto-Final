const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DesejosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  desejo: { type: String, required: true },
  dataConquistar: { type: Date, required: true },
  descricaoData: {type: String},
  valor: { type: Number, required: true },
})

const desejosModel = mongoose.model('desejos', DesejosSchema);

module.exports = {desejosModel, DesejosSchema};
