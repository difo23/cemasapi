const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionGeneralSchema = new Schema({
	_id: Schema.Types.ObjectId,
	calificacion: {
		type: Schema.Types.ObjectId,
		ref: 'Calificacion'
	},
	estado: {
		type: Boolean,
		default: true
	},
	estudiante_calificado: {
		type: Schema.Types.ObjectId,
		ref: 'Estudiante'
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
