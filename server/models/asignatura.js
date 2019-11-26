const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let asignaturaSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_asignatura: {
		type: String
	},
	cursos: [
		{
			type: String
		}
	],
	profesores: [
		{
			type: String
		}
	],
	modalidad: {
		type: String
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
