const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let periodos_estudiantesSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_curso: {
		type: String
	},
	codigo_centro: {
		type: String
	},
	codigo_periodo: {
		type: String
	},
	estudiantes_inscritos: [{
		type: Map,
		of: String
	}],
	codigo_calificaciones: {
		type: String
	},
	codigo_titular: {
		type: String
	},
	nombre_titular: {
		type: String
	},
	estado: {
		type: Boolean

	}
});

module.exports = mongoose.model('periodos_estudiantes', periodos_estudiantesSchema);
