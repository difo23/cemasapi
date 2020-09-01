const mongoose = require('mongoose');
const uuid = require('uuid');

let Schema = mongoose.Schema;

let usersSchema = new Schema({


  _id: Schema.Types.ObjectId,
  username: { type: String, unique: true, required: true },
  codigoCentro: { type: String, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  estado: {
    type: Boolean

  }
});

/*usersSchema.set('toJSON', {
  virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
       delete ret._id;
        delete ret.hash;
    }
});
*/

module.exports = mongoose.model('users', usersSchema);
