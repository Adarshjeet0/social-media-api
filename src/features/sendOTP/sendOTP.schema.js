// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate: {
//         validator: function (v) {
//           return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Email validation regex
//         },
//         message: (props) => `${props.value} is not a valid email!`,
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 8, // Enforce minimum password length
//     },
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     otp: {
//       type: Number,
//       default: null, // Temporary storage for OTP
//     },
//     otpExpiry: {
//       type: Date,
//       default: null, // Expiry time for the OTP
//     },
//   },
//   {
//     timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
//   }
// );

// const UserModel = mongoose.model('User', userSchema);

// export default UserModel;
