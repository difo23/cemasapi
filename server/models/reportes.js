const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reportesSchema = new Schema({

	_id: Schema.Types.ObjectId,

    curso: {
		type: String
	},
	numero_estudiante: {
		type: String
	},
	nombre_estudiante: {
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
	rne: {
		type: String
		//unique: true
	},

	titular_codigo: {
		type: String

	},

	estado: {
		type: Boolean

	}
});

module.exports = mongoose.model('reportes', reportesSchema );