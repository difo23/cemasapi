const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cursoSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_curso: {
		type: String,
		unique: true
	},
	seccion: {
		type: String
	},
	grado: {
		type: Number
	},
	modalidad: {
		type: String,
		required: true
	},
	estado: {
		type: Boolean,
		default: true
	},
	asignaturas: [
		{
			type: String
		}
	],
	especialidad: {
		type: String,
		required: true
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('cursos', cursoSchema);
