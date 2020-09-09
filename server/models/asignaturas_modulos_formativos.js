const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let asignaturas_modulos_formativosSchema = new Schema({
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
	},
	estado: {
		type: Boolean
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

module.exports = mongoose.model('asignaturas_modulos_formativos', asignaturas_modulos_formativosSchema);
