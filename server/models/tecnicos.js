const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let tecnicosSchema = new Schema({
	_id: Schema.Types.ObjectId,
	denominacion: {
		type: String
	},
	familia_profesional: {
		type: String
	},
	nivel: {
		type: Number
	},
	codigo: {
		type: Number

	},
	modulos_formativos: [{
		type: String
	}],
	modulos_comunes: [{
		type: String
	}],
	asignaturas: [{
		type: String
	}],
	updated: {
		type: String

	}
});

module.exports = mongoose.model('tecnicos', tecnicosSchema);
