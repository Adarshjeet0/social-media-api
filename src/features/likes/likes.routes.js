import express from 'express';
import LikeController from './likes.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
export const likesRouter = express.Router();

const likeController = new LikeController();

//--------------------Old Likes routes-----------------------------
// likesRouter.get('/:postId',jwtAuth, LikeController.getAll);

// likesRouter.get('/toggle/:postId',jwtAuth, LikeController.toggleLike);


//---------------------New likes routes-----------------------------
likesRouter.get('/:id', (req, res,next)=>{
    likeController.getLikes(req, res, next);
})
likesRouter.post('/toggle/:id', (req, res,next)=>{
    likeController.toggleLike(req, res, next);
})