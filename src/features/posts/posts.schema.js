import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    caption:{
        type:String,
        required:false,
        maxLength:280
    }
},
{timestamps:true});

const PostModel = mongoose.model('Post',postSchema);
export default PostModel;