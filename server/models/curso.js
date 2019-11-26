const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cursoSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_curso: {
		type: String
	},
	seccion: {
		type: String
	},
	grado: {
		type: Number
	},
	modalidad: {
		type: String
	},
	estado: {
		type: String
	},
	asignaturas: [
		{
			type: String
		}
	],
	especialidad: {
		type: String
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('cursos', cursoSchema);
