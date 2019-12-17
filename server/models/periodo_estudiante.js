const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let periodos_estudiantesSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_curso: {
		type: String
	},
	codigo_periodo: {
		type: Number
	},
	fecha_inicio: {
		type: Number
	},
	fecha_fin: {
		type: Number

	},
	estudiante_inscritos: {
		type: Number
	},
	codigo_calificaciones: {
		type: Number
	},
	titular: {
		type: String
	},
	updated: {
		type: String

	}
});

module.exports = mongoose.model('periodos_estudiantes', periodos_estudiantesSchema);
