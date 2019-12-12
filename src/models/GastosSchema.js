const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GastosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  data: { type: Date, default: Date.now  },
  motivo: { type: String, required: true },
  valor: { type: Number, required: true },
})

const gastosModel = mongoose.model('gastos', GastosSchema);


module.exports = {gastosModel, GastosSchema};