const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let estudianteSchema = new Schema({
	_id: Schema.Types.ObjectId,
	cursos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Curso'
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
		type: String,
		unique: true
	},
	img: {
		type: String,
		required: false
	},
	telefono_tutor: {
		type: String
	},
	estado: {
		type: Boolean,
		default: true
	},
	nombre_tutor: {
		type: String,
		required: false
	},
	updated: {
		type: Date,
		default: Date.now
	},
	fecha_nacimiento: { type: Date },
	sexo: { type: String },
	edad: {
		type: Number,
		min: 6,
		max: 25
	},
	RNE: {
		type: String,
		required: true,
		unique: true
	}
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
