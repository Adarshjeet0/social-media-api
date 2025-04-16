import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        validate: {
            validator: function(value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value); // Basic email regex
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
            },
            message: "Password should be between 8-12 characters and have a special character"
        }
    },
    tokenVersion: {
        type: Number,
        default: 0 // Starts at 0, increments when logging out from all devices
    },
    otp: {
        type: Number,
        default: null, // Temporary storage for OTP
    },
        otpExpiry: {
        type: Date,
        default: null, // Expiry time for the OTP
    },
},
{
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const UserModel = mongoose.model('User',userSchema);
export default UserModel;