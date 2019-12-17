const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let estudianteSchema = new Schema({
	_id: Schema.Types.ObjectId,
	cursos: [
		{
			type: String
		}
	],
	estado: {
		type: Boolean
		//required: [ true, 'el nombre es necesario' ]
	},
	nombre: {
		type: String
	},
	email: {
		type: String
		//required: [ true, 'El matricula es necesario' ]
	},
	RNE: {
		 type: String 
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
		type: String
	}
	
	
});

module.exports = mongoose.model('Estudiante', estudianteSchema);
