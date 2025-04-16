import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts', 
      required: true,
      unique:true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users', 
      required: true,
      unique:true
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, 
    },
  },
  {
    timestamps: true, 
  }
);

// commentSchema.index({ userId: 1,postId: 1 },{unique:false}); 

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;
