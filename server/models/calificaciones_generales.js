const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let generalesSchema = new Schema({
	_id: Schema.Types.ObjectId,
	codigo_curso:{
		type: String
	},
	codigo_maestro:{
		type: String
	},
	codigo_materia:{
		type: String
	},
	periodo:{
		type: String
	},
	tipo:{
		type: String
	},
	cantidad_estudiantes:{
		type: String
	},
	calificaciones:[{
		type: Map,
    of: String
	}],
	activo:{
		type: Boolean
	}

});

module.exports = mongoose.model('calificaciones_generales', generalesSchema);
