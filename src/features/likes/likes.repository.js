import LikeModel from './likes.schema.js';

export default class LikeRepository {

    async getLikesById(id) {
        return await LikeModel.find({ targetId: id }); // `targetId` can be postId or commentId
    }

    async toggleLike(targetId, userId, targetType) {
        const existingLike = await LikeModel.findOne({ targetId, userId});

        if (existingLike) {
            // If a like already exists, remove it (unlike)
            await LikeModel.deleteOne({ _id: existingLike._id });
            return { action: "unliked", like: existingLike };
        } else {
            // Otherwise, add a new like
            const newLike = new LikeModel({ targetId, userId});
            await newLike.save();
            return { action: "liked", like: newLike };
        }
    }
}
