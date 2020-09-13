const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let pdfSchema = new Schema({
    _id: Schema.Types.ObjectId,
    curso: {
        type: String
    },
    codigo_usuario: {
        type: String
    },
    estado: {
        type: Boolean
    },
    path: {
        type: String
    },
    url: {
        type: String
    }
});

module.exports = mongoose.model('pdf', pdfSchema);