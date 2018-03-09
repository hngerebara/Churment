const mongoose = require('mongoose'),  
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt');

//================================
// User Schema
//================================
const UserSchema = new Schema({  
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profile: {
      firstName: { type: String },
      lastName: { type: String }
    },
    role: {
      type: String,
      enum: ['Member', 'Client', 'Owner', 'Admin'],
      default: 'Member'
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: true
  });
  
// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {  
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input(login) to password saved in database
UserSchema.methods.comparePassword = function(candidatePassword, cb) {  
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);  
