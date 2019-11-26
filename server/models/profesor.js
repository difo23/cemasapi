const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let profesorSchema = new Schema({
	_id: Schema.Types.ObjectId,
	cursos_impartidos: [
		{
			type: String
		}
	],
	asignaturas_impartidas: [
		{
			type: String
		}
	],
	nombre: {
		type: String
	},
	apellido: {
		type: String
	},
	codigo_maestro: {
		type: String
	},
	email: {
		type: String
	},
	img: {
		type: String
	},
	telefono: {
		type: String
	},
	estado: {
		type: Boolean,
		default: true
	},

	updated: {
		type: Date,
		default: Date.now
	},
	edad: {
		type: Number,
		min: 6,
		max: 60
	}
});

module.exports = mongoose.model('Profesor', profesorSchema);
