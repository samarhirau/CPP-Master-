import mongoose from 'mongoose';
import bycriptjs from 'bcryptjs';



const userSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true,
     trim: true,
     maxlength: 50,
     minlength: 3,
     validate: {
       validator: function(v) {
           return /^[a-zA-Z\s]+$/.test(v);
        },
           message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
     }


     },
     email: {
     type: String,
     required: true,
     unique: true,
     trim: true,
     lowercase: true,
     validate: {
           validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
                message: props => `${props.value} is not a valid email!`
     }

     },
     password: {
     type: String,
     required: true,
     minlength: 6,
     maxlength: 1024
     },
     isAdmin: {
     type: Boolean,
     default: false
     },
      isVerified: {
        type :Boolean,
        default :false

      },
    verificationToken: {
  type: String,
  default: null,
},
verificationTokenExpiry: {
  type: Date,
  default: null,
},


      resetPasswordToken: {
        type: String,
        default: null
      },
      resetPasswordTokenExpiry: {
        type: Date,
        default: null
      }
});


const User = mongoose.models.User || mongoose.model('User', userSchema);


userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await this.hashPassword(this.password);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});



userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bycriptjs.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
}

userSchema.methods.hashPassword = async function(password) {
  try {
    const salt = await bycriptjs.genSalt(10);
    return await bycriptjs.hash(password, salt);
  } catch (error) {
    throw new Error('Password hashing failed');
  }
}





export default User;


