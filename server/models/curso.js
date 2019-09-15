const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cursoSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo: {
		type: String,
		unique: true
	},	
	centro: {
		type: String
	},
	estudiantes_inscritos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Estudiante'
		}
	],
	profesores: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Profesor'
		}
	],
	titular: {
		type: Schema.Types.ObjectId,
		ref: 'Profesor'
	},

	periodo: {
		type: String
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
			type: Schema.Types.ObjectId,
			ref: 'Asignatura'
		}
	],
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Curso', cursoSchema);
