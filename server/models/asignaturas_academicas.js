const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let asignaturas_academicasSchema = new Schema({
	_id: Schema.Types.ObjectId,

	codigo: {
			type: String,
			ref: 'Codigo'
		},

	nombre: {
			type: String,
			ref: 'Nombre'
		},

	horas_semanales: {
		type: Number
	},

	horas_anos: {
		type: Number
	},

	grado: {
		type: Number
	},

	cursos_profesor: [{}] ,

	estado: {
		type: Boolean
	},
	modalidad: {
		type: String
	}
});

module.exports = mongoose.model('asignaturas_academicas', asignaturas_academicasSchema);
