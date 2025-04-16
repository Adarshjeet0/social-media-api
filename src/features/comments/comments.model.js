export default class CommentModel{
    static id = 0;
    constructor(userId, postId, content){
        this.id = ++CommentModel.id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static getAll(postId){
        // console.log(postId);
        return comments.filter(comment => comment.postId == parseInt(postId));
    }

    static addComment(userId, postId, content){
        const alreadyExistCommentIndex = comments.findIndex(comment => comment.userId == userId && comment.postId == postId);
        if(alreadyExistCommentIndex < 0){
            const newComment = new CommentModel(userId, postId, content);
            comments.push(newComment);
            return newComment;
        }
        else{
            comments[alreadyExistCommentIndex].content = content;
            return comments[alreadyExistCommentIndex];
        }
    }

    static updateComment(commentId, newContent){
        const commentIndex = comments.findIndex(comment => comment.id == commentId);
        if(commentIndex != -1){
            comments[commentIndex].content = newContent; 
            return comments[commentIndex];
        }
    }

    static deleteComment(commentId){
        const commentIndex = comments.findIndex(comment => comment.id == commentId);
        if(commentIndex>=0){
            comments.splice(commentIndex, 1);
            return comments;
        }
    }



    
}

let comments = [
    new CommentModel(1, 1, "This is a comment"),
    new CommentModel(2, 1, "This is another comment"),
    new CommentModel(3, 2, "This is a comment on post 2"),
];
