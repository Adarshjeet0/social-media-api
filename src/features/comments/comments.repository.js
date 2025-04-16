import CommentModel from './comments.schema.js';
import PostModel from '../posts/posts.schema.js';

export default class CommentRepository{
    async getCommentByPostId(postId){
        return await CommentModel.find({postId});  
    }
    async addCommentByPostId(postId, userId, comment) {
        // Check if the post exists
        const post = await PostModel.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
    
        // Create and save the comment
        const newComment = new CommentModel({ postId, userId, comment });
        await newComment.save();
        return newComment;
    }
    async updateCommentByCommentId(commentId, comment){
        console.log(comment);
        return await CommentModel.findByIdAndUpdate(commentId,{comment: comment},{new:true});
    }
    async deleteCommentByCommentId(commentId){
        return await CommentModel.deleteOne({_id:commentId});
    }
}