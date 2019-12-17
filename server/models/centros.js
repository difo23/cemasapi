const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let centrosSchema = new Schema({
	_id: Schema.Types.ObjectId,
	siglas: {
		type: String
	},
	nombre_centro: {
		type: String
	},
	codigo_centro: {
		type: Number
	},
	cursos: [{
		type: String

	}],
	profesores: [{
		type: String
	}],
	estudiantes: [{
		type: String
	}],
	asignaturas: [{
		type: String
	}],
	directores: [{
		type: String
    }],	
    regional: {
		type: String
    },
    provincial: {
		type: String
    },
    telefono: {
		type: Number
    },
    email: {
		type: String
	},
	updated: {
		type: String

	}
});

module.exports = mongoose.model('centros', centrosSchema);
