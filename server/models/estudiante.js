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
	email: {
		type: Boolean
	},
	RNE: {
		type: String
		//required: [ true, 'El matricula es necesario' ]
	},
	matricula: {
		 type: String 
	},
	apellido: {
		type: String
	},
	img: {
		type: String
	},
	sexo: {
		type: String
	},
	fecha_nacimiento: {
		type: String
	},
	telefono_tutor: {
		type: String
	},
	nombre_tutor: {
		type: String
	},
	edad: { 
		type: Number
	}
	
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
