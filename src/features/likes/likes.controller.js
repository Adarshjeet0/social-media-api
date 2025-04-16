import LikeModel from './likes.model.js';
import {ApplicationError} from '../../error-Handler/applicationError.js';
import LikeRepository from './likes.repository.js';
export default class LikeController{

    //-------------------Old Controller Code----------------------
    // static getAll(req, res){
    //     const postId = parseInt(req.params.postId);
    //     const likes = LikeModel.getAll(postId);
    //     if(likes.length>0){
    //         return res.status(200).send(likes);
    //     }
    //     else{
    //         return res.status(404).send("No likes found");
    //     }

    // }

    // static toggleLike(req, res){
    //     const postId = parseInt(req.params.postId);
    //     const userId = req.userId;
    //     const newLike = LikeModel.toggleLike(userId, postId);
    //     if(newLike){
    //         return res.status(200).send(newLike);
    //     }
    //     return res.status(404).send("Like removed");
    // }

    //---------------------------New Controller Code-------------------------


    constructor() {
        this.likeRepository = new LikeRepository();
    }

    async getLikes(req, res, next) {
        try {
            const id = req.params.id; // Get the ID from route parameter
            const likes = await this.likeRepository.getLikesById(id);

            if (!likes || likes.length === 0) {
                return res.status(404).send({ message: "No likes found for the specified ID" });
            }

            return res.status(200).json(likes);
        } catch (error) {
            console.log(error);
            new ApplicationError("Error fetching likes", 500);
        }
    }

    async toggleLike(req, res, next) {
        try {
            const targetId = req.params.id;
            // const {targetType } = req.body; // `targetId` is the post/comment ID
            const userId = req.userId; // Assuming `userId` is extracted from the token middleware
            // console.log(targetId);
            // console.log(targetType);
            // console.log(userId);
            // if (!["Post", "Comment"].includes(targetType)) {
            //     return res.status(400).send({ message: "Invalid target type" });
            // }

            const result = await this.likeRepository.toggleLike(targetId, userId);

            if (result.action === "liked") {
                return res.status(200).send({ message: "Liked successfully", like: result.like });
            } else {
                return res.status(200).send({ message: "Unliked successfully", like: result.like });
            }
        } catch (error) {
            console.log(error);
            new ApplicationError("Error toggling like", 500);
        }
    }
}
