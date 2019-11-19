const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let profesorSchema = new Schema({
	_id: Schema.Types.ObjectId,
	cursos_impartidos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Curso'
		}
	],
	asignaturas_impartidas: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Asignaturas'
		}
	],
	nombre: {
		type: String
	},
	apellido: {
		type: String
	},
	codigo_maestro: {
		type: String,
		required: [ true, 'El es necesario' ],
		unique: true
	},
	email: {
		type: String,
		unique: true
	},
	img: {
		type: String,
		required: false
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
