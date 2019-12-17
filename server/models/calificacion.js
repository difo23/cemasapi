const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionSchema = new Schema({
	_id: Schema.Types.ObjectId,
	curso: {
		type: String
	},
	periodo: { type: String },
	profesor: {
		type: String
	},
	asignatura: {
		type: String
	},
	modalidad: {
		type: String
	},
	estado: {
		type: String
	},
	estudiantes_calificados: [
		{
			type: String
		}
	],
	calificaciones_generales: [
		{
			type: String
		}
	],
	calificaciones_extraordinarias: [
		{
			type: String
		}
	],
	calificaciones_completivas: [
		{
			type: String
		}
	],
	calificaciones_tecnicas: [
		{
			type: String
		}
	],
	updated: {
		type: String
	}
});

module.exports = mongoose.model('Calificacion', calificacionSchema);
