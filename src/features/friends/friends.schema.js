import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted'], // Defines the possible values for status
      default: 'pending', // Default value is 'pending'
    },
  },
  { 
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Ensures a user can only send one friend request to the same recipient
friendSchema.index({ requester: 1, recipient: 1 }, { unique: true });

const FriendModel = mongoose.model('Friend', friendSchema);

export default FriendModel;
