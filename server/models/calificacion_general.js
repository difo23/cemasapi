const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionGeneralSchema = new Schema({
	_id: Schema.Types.ObjectId,
	calificacion: {
		type: String
	},
	estado: {
		type: String
	},
	estudiante_calificado: {
		type: String
	},
	numero: { type: Number },
	ago_sept_oct: { type: Number },
	nov_dic_ene: { type: Number },
	feb_mar: { type: Number },
	abr_may_jun: { type: Number },
	cf: { type: Number },
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('CalificacionGeneral', calificacionGeneralSchema);
