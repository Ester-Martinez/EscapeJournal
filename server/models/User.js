const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  userType: {type: String, enum: ['escapista', 'sala', 'admin'], default: 'escapista'},
  name: String,
  experience: [{ type : Schema.Types.ObjectId, ref: 'Experience' }],
  roomsDone: [{ type : Schema.Types.ObjectId, ref: 'EscapeRooms' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
