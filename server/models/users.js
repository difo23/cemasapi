const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usersSchema = new Schema({

   
	_id: Schema.Types.ObjectId,

    username: {
		type: String
	},
	password: {
		type: String
	},
	nombres: {
		type: String
    },
    
	apellidos: {
		type: String

	},
	cursos_materias: [{
		type: Map,
		of: String
	}],

	estado: {
		type: Boolean

	}
});

module.exports = mongoose.model('users', usersSchema);