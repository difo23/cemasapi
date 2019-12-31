const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionesSchema = new Schema({

	_id: Schema.Types.ObjectId,

    codigo_curso: {
		type: String
	},
	codigo_periodo: {
		type: String
	},
	codigo_maestro: {
		type: String
    },
    
	codigo_asignatura: {
		type: String

	},
	calificaciones_estudiantes: [{
		type: Map,
		of: String
	}],
	codigo_calificaciones: {
		type: String
	},

	modalidad: {
		type: String

	}
});

module.exports = mongoose.model('calificaciones', calificacionesSchema);
