const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const experienceSchema = new Schema({
  name: String,
  email: String,
  roomsDone: [{ type : Schema.Types.ObjectId, ref: 'EscapeRooms' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', experienceSchema);
module.exports = User;