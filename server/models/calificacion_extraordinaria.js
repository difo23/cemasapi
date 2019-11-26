const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionExtraordinariaSchema = new Schema({
	_id: Schema.Types.ObjectId,
	calificacion_completiva: {
		type: String
	},
	estado: {
		type: Boolean,
		default: true
	},
	estudiante_calificado: {
		type: String
	},
	numero: { type: Number },
	pcp_30: { type: Number },
	cpex: { type: Number },
	cpex_70: { type: Number },
	cex: { type: Number },
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('CalificacionExtraordinaria', calificacionExtraordinariaSchema);
