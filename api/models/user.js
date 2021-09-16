const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const constats = require('../constants');

const {
  ROLES,
  TRANSACTIONS
} = constats;

const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.keys(ROLES).map(key => ROLES[key]),
    default: ROLES.USER,
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  deactivated: { type: Boolean, default: false },
  sessions: [{
    wallet: Number,
    transactions: [{
      stock: String,
      price: Number,
      volume: Number,
      kind: {
          type: String,
          enum: Object.keys(TRANSACTIONS).map(key => TRANSACTIONS[key]),
          required: true,
      }
    }],
  }],
},
{
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

//= ===============================
// User model hooks
//= ===============================
async function hashPassword(next) {
  const user = this;

  if (user && user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(5);
      user.password = await bcrypt.hash(user.password, salt, null);
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
}

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', hashPassword);
UserSchema.pre('update', hashPassword);

//= ===============================
// User model methods
//= ===============================
// Method to compare password for login
UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model('User', UserSchema);
