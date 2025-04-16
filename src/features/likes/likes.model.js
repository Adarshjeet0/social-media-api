export default class LikeModel{
    static id = 0;
    constructor(userId, postId){
        this.id = ++LikeModel.id;
        this.userId = userId;
        this.postId = postId;
    }

    static getAll(postId){
        return likes.filter(like => like.postId == postId);
    } 

    static toggleLike(userId, postId){
        // console.log(userId);
        const toggleLikeIndex = likes.findIndex( like => like.userId == userId);
        console.log(toggleLikeIndex)
        if(toggleLikeIndex >= 0){
            likes.splice(toggleLikeIndex, 1);
            
        }else{
            const newLike = new LikeModel(userId, postId);
            likes.push(newLike);
            return newLike;
        }

    }
}

let likes = [
    new LikeModel(1, 1),
    new LikeModel(1, 2),
    new LikeModel(2, 1),
]