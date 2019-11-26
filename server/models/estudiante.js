const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let estudianteSchema = new Schema({
	_id: Schema.Types.ObjectId,
	cursos: [
		{
			type: String
		}
	],
	nombre: {
		type: String
		//required: [ true, 'el nombre es necesario' ]
	},
	apellido: {
		type: String
	},
	matricula: {
		type: String
		//required: [ true, 'El matricula es necesario' ]
	},
	codigo_curso_activo: { type: String },
	email: {
		type: String
	},
	img: {
		type: String
	},
	telefono_tutor: {
		type: String
	},
	estado: {
		type: String
	},
	nombre_tutor: {
		type: String
	},
	updated: {
		type: Date,
		default: Date.now
	},
	fecha_nacimiento: { type: String },
	sexo: { type: String },
	edad: {
		type: Number,
		min: 6,
		max: 25
	},
	RNE: {
		type: String
	}
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
