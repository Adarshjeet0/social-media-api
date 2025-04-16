import PostRepository from './posts.repository.js';
import {ApplicationError} from '../../error-Handler/applicationError.js';
export default class PostController{
    constructor(){
        this.postRepository = new PostRepository();
    }

    async getAll(req, res){
        try {
           const posts = await this.postRepository.getAll();
           if(posts){
                return res.status(200).send(posts);
           } else{
                return res.status(404).send("Posts are not found");
           }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with databases", 501);
        }
    }
    async getPostById(req, res){
        try {
            const postId = req.params.postId;
            const post = await this.postRepository.getPostById(postId);
            if(post){
                return res.status(200).send(post);
            }else{
                return res.status(404).send("Post not found");
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with databases", 501);
        }
    }
    async getUserPost(req, res){
        try {
            const userId = req.userId;
            const posts = await this.postRepository.getUserPost(userId);
            if(posts){
                return res.status(200).send(posts);
            }else{
                return res.status(404).send("Posts are not found");
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with databases", 501);
        }
    }
    async createPost(req, res){
        try {
            const userId = req.userId;
            const imageUrl = req.file.filename;
            const {caption} = req.body;
            console.log("these are details:", userId, imageUrl, caption);
            const posts = await this.postRepository.createPost(userId, caption, imageUrl);
            if(posts){
                return res.status(200).send(posts);
            }else{
                return res.status(404).send("Failed to create post");
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with databases", 501);
        }
    }
        async deletePostById(req, res){
            try {
                const postId = req.params.postId;
                const userId = req.userId;
                const deletedPost = await this.postRepository.deletePostById(postId, userId);
                if(deletedPost.deletedCount!== 0){
                    return res.status(200).send("Deleted Successfully!!");
                }else{
                    return res.status(404).send("Failed to delete");
                }
            } catch (error) {
                console.log(error);
                throw new ApplicationError("Something went wrong with databases", 501);
            }
        }
    async updatePostById(req, res){
        try {
            const postId = req.params.postId;
            const userId = req.userId;
            const imageUrl = req?.file?.filename;
            // if(!imageUrl){

            // }
            const {caption} =req.body;
            const post = await this.postRepository.updatePostById(postId, userId, imageUrl, caption);
            if(post){
                return res.status(200).send(post);
            }else{
                return res.status(404).send("Post not found");
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with databases", 501);
        }
    }
}