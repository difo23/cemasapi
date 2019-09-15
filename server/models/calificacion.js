const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let calificacionSchema = new Schema({
	_id: Schema.Types.ObjectId,
	curso: {
		type: Schema.Types.ObjectId,
		ref: 'Curso'
	},
	periodo: { type: String },
	profesor: {
		type: Schema.Types.ObjectId,
		ref: 'Profesor'
	},
	asignatura: {
		type: Schema.Types.ObjectId,
		ref: 'Asignatura'
	},
	modalidad: {
		type: String,
		required: true
	},
	estado: {
		type: Boolean,
		default: true
	},
	estudiantes_calificados: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Estudiante'
		}
	],
	calificaciones_generales: [
		{
			type: Schema.Types.ObjectId,
			ref: 'CalificacionGeneral'
		}
	],
	calificaciones_extraordinarias: [
		{
			type: Schema.Types.ObjectId,
			ref: 'CalificacionExtraordinaria'
		}
	],
	calificaciones_completivas: [
		{
			type: Schema.Types.ObjectId,
			ref: 'CalificacionCompletiva'
		}
	],
	calificaciones_tecnicas: [
		{
			type: Schema.Types.ObjectId,
			ref: 'CalificacionTecnica'
		}
	],
	updated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Calificacion', calificacionSchema);
