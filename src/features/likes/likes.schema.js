import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'targetType', // Dynamically references either 'Post' or 'Comment'
    },
    targetType: {
      type: String,
      // required: true,/
      enum: ['Post', 'Comment'], // Ensures it's either a Post or a Comment
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the user who liked
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
  }
);

// Ensure that a user can like a specific target (Post or Comment) only once
likeSchema.index({ targetId: 1, targetType: 1, userId: 1 }, { unique: true });

const LikeModel = mongoose.model('Like', likeSchema);

export default LikeModel;
