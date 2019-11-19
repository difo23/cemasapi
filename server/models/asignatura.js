const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let asignaturaSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_asignatura: {
		type: String,
		unique: true
	},
	cursos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Curso'
		}
	],
	profesores: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Profesor'
		}
	],
	modalidad: {
		type: String,
		required: true
	},
	codigo_tecnico: {
		type: String,
		default: 'GENERAL'
	},
	estado: {
		type: Boolean,
		default: true
	},
	horas_semanales: {
		type: Number
	},
	ras: {
		type: Number
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Asignatura', asignaturaSchema);
