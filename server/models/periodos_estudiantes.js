const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let periodos_estudiantesSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_curso: {
		type: String
	},
	codigo_periodo: {
		type: String
	},
	fecha_inicio: {
		type: String
	},
	fecha_fin: {
		type: String

	},
	estudiantes_inscritos: [{
		type: Map,
		of: String
	}],
	codigo_calificaciones: {
		type: String
	},
	titular: {
		type: String
	}
});

module.exports = mongoose.model('periodos_estudiantes', periodos_estudiantesSchema);
