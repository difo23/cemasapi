const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionTecnicaSchema = new Schema({
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
	ra1: { type: Number },
	ra2: { type: Number },
	ra3: { type: Number },
	ra4: { type: Number },
	ra5: { type: Number },
	ra6: { type: Number },
	ra7: { type: Number },
	ra8: { type: Number },
	ra9: { type: Number },
	ra10: { type: Number },
	ra11: { type: Number },
	ra12: { type: Number },
	ra13: { type: Number },
	ra14: { type: Number },
	ra15: { type: Number },
	ra16: { type: Number },
	ra17: { type: Number },
	ra18: { type: Number },
	ra19: { type: Number },
	ra20: { type: Number },
	total: { type: Number },
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('CalificacionTecnica', calificacionTecnicaSchema);
