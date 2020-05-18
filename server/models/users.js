const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usersSchema = new Schema({

   
	_id: Schema.Types.ObjectId,

    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
	cursos_materias: [{
		type: Map,
		of: String
	}],

	estado: {
		type: Boolean

	}
});

usersSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});


module.exports = mongoose.model('users', usersSchema);