const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let asignaturas_modulos_comunesSchema = new Schema({
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
		type: Number,
	},

	horas_anos: {
		type: Number,
	},

	grado: {
		type: Number,
	},

	cursos_profesor: [{}] ,

	estado: {
		type: Boolean,
	},
	modalidad: {
		type: String,
    },
    nivel: {
		type: Number,
	},
    unidad_competencia: {
		type: String,
	},
    ra: {
		type: Number,
	},
    ra_porcentaje: [{}] ,
});

module.exports = mongoose.model('asignaturas_modulos_comunes', asignaturas_modulos_comunesSchema);
