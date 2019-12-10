const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cursoSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_curso: {
		type: String
	},
	asignaturas: [
		{
			type: String
		}
	],
	estado: {
		type: Boolean
	},
	codigo_curso: {
		type: String
	},
	grado: {
		type: Number
	},
	seccion: {
		type: String
	},
	modalidad: {
		type: String
	},
	especialidad: {
		type: String
	}
});

module.exports = mongoose.model('cursos', cursoSchema);