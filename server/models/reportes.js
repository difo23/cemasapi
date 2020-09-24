const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reportesSchema = new Schema({

	_id: Schema.Types.ObjectId,

	curso: {
		type: String
	},
	periodo: {
		type: String
	},

	codigo_titular: {
		type: String

	},
	nombre_titular: {
		type: String

	},
	numero_estudiante: {
		type: String
	},
	nombre_estudiante: {
		type: String
	},
	rne: {
		type: String
		
	},

	boletin: {
		type: String

	},
	asignaturas: [{
		type: Map,
		of: String
	}],
	modulos: [{
		type: Map,
		of: String
	}],



	estado: {
		type: Boolean

	}
});

module.exports = mongoose.model('reportes', reportesSchema);