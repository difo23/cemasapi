const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionesSchema = new Schema({

	_id: Schema.Types.ObjectId,
	codigo_centro: {
		type: String
	},
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
	calificacion_estudiantes: [{
		type: Map,
		of: String
	}],
	codigo_calificacion: {
		type: String, 
		
	},

	modalidad: {
		type: String

	},
	ras: {
		type: String

	},
	estudiantes: {
		type: String

	},

	estado: {
		type: Boolean

	}
});

module.exports = mongoose.model('calificaciones', calificacionesSchema);
