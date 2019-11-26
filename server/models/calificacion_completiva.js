const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionCompletivaSchema = new Schema({
	_id: Schema.Types.ObjectId,
	calificacion_general: {
		type: String
	},
	estado: {
		type: String
	},
	estudiante_calificado: {
		type: String
	},
	numero: { type: Number },
	pcp_50: { type: Number },
	cpc: { type: Number },
	cpc_50: { type: Number },
	cc: { type: Number },
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('CalificacionCompletiva', calificacionCompletivaSchema);
