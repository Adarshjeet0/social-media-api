import PostModel from './posts.schema.js';
export default class PostRepository{
    async getAll(){
       return await PostModel.find(); 
    }
    async getPostById(postId){
       return await PostModel.findById(postId); 
    }
    async getUserPost(userId){
       return await PostModel.find({userId}); 
    }
    async createPost(userId, caption, imageUrl){
        const newPost = new PostModel({
            imageUrl,
            userId,
            caption
        });
        return await newPost.save();
    }
    async deletePostById(postId,userId){
        const deletedPost = await PostModel.deleteOne({ _id: postId, userId: userId });
        return deletedPost;   
    }
    async updatePostById(postId, userId, imageUrl, caption) {
        let updatedPost;
    
        if (imageUrl) {
            updatedPost = await PostModel.findOneAndUpdate(
                { _id: postId, userId: userId },
                { imageUrl: imageUrl, caption: caption },
                { new: true } // Return the updated document
            );
        } else {
            updatedPost = await PostModel.findOneAndUpdate(
                { _id: postId, userId: userId },
                { caption: caption },
                { new: true }
            );
        }
    
        return updatedPost;
    }
    
}