import express from 'express';
import CommentController from './comments.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

export const commentsRouter = express.Router();
const commentController = new CommentController();

//-------------------------Old routes--------------------------


// commentsRouter.get('/:postId',jwtAuth, CommentsController.getComment);

// commentsRouter.post('/:postId',jwtAuth, CommentsController.addComment);

// commentsRouter.delete('/:commentId',jwtAuth, CommentsController.deleteComment);

// commentsRouter.put('/:commentId',jwtAuth, CommentsController.updateComment);


//-----------------------New Routes-------------------------------------

commentsRouter.get('/:postId',(req, res)=>{
    commentController.getCommentByPostId(req, res);
})
commentsRouter.post('/:postId',(req, res)=>{
    commentController.addCommentByPostId(req, res);
})
commentsRouter.put('/:commentId',(req, res)=>{
    commentController.updateCommentByCommentId(req, res);
})
commentsRouter.delete('/:commentId',(req, res)=>{
    commentController.deleteCommentByCommentId(req, res);
})